import axios from "axios";
import { Request, Response } from "express";

import ngrok from "ngrok";
import dotenv from "dotenv";
import { RequestExtended } from "../middleware/generateToken";
import { timestamp } from "../middleware/timeStamp";
dotenv.config();


export const handleStkPush = async (req: RequestExtended, res: Response) => {
  const { phone, amount, Order_ID } = req.body;

  const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE as string;

  const password = Buffer.from(
    BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + timestamp
  ).toString("base64");

  // Create callback URL using ngrok
  const callback_url = await ngrok.connect(Number(process.env.PORT));
  const api = ngrok.getApi();
  if (api) {
    await api.listTunnels();
  } else {
    throw new Error("Ngrok API is null");
  }
  console.log("callback URL: ", callback_url);

  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
    PhoneNumber: phone,
    CallBackURL: `${callback_url}/lipa/stkPushCallback/${Order_ID}`,
    AccountReference: "venum shops",
    TransactionDesc: "Payment",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    res.status(200).json({
      message: "STK Push initiated successfully",
      data: response.data,
    });
  } catch (error: any) {
    console.log("Error in STK Push: ", error);
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

export const stkPushCallback = async (req: RequestExtended, res: Response) => {
  const Order_ID = req.params.Order_ID;
  const responseData = req.body;

  console.log("Full STK Push Callback Response:", JSON.stringify(responseData, null, 2));

  try {
    // Extract callback response details
    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = responseData.Body.stkCallback;

    // Log important details
    console.log("Order ID:", Order_ID);
    console.log("Callback Metadata:", CallbackMetadata);

    // Handle different ResultCode cases
    if (ResultCode === 0) {
      console.log("Transaction successful");
    } else if (ResultCode === 1032) { 
      console.log("User canceled the transaction");
  
    } else {
      console.log("Transaction failed or was not completed");
    
    }

    // Respond back to the callback handler
    res.status(200).json({
      message: "Callback processed successfully",
      data: responseData,
    });

  } catch (error: any) {
    console.log("Error in STK Push Callback: ", error);
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
}
