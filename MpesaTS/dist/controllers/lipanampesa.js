"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stkPushCallback = exports.handleStkPush = void 0;
const axios_1 = __importDefault(require("axios"));
const ngrok_1 = __importDefault(require("ngrok"));
const dotenv_1 = __importDefault(require("dotenv"));
const timeStamp_1 = require("../middleware/timeStamp");
dotenv_1.default.config();
const handleStkPush = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, amount, Order_ID } = req.body;
    const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE;
    const password = Buffer.from(BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + timeStamp_1.timestamp).toString("base64");
    // Create callback URL using ngrok
    const callback_url = yield ngrok_1.default.connect(Number(process.env.PORT));
    const api = ngrok_1.default.getApi();
    if (api) {
        yield api.listTunnels();
    }
    else {
        throw new Error("Ngrok API is null");
    }
    console.log("callback URL: ", callback_url);
    const payload = {
        BusinessShortCode: BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timeStamp_1.timestamp,
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
        const response = yield axios_1.default.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", payload, {
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        });
        res.status(200).json({
            message: "STK Push initiated successfully",
            data: response.data,
        });
    }
    catch (error) {
        console.log("Error in STK Push: ", error);
        res.status(500).json({
            message: "Failed",
            error: error.message,
        });
    }
});
exports.handleStkPush = handleStkPush;
const stkPushCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Order_ID = req.params.Order_ID;
    const responseData = req.body;
    console.log("Full STK Push Callback Response:", JSON.stringify(responseData, null, 2));
    try {
        // Extract callback response details
        const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata, } = responseData.Body.stkCallback;
        // Log important details
        console.log("Order ID:", Order_ID);
        console.log("Callback Metadata:", CallbackMetadata);
        // Handle different ResultCode cases
        if (ResultCode === 0) {
            console.log("Transaction successful");
        }
        else if (ResultCode === 1032) {
            console.log("User canceled the transaction");
        }
        else {
            console.log("Transaction failed or was not completed");
        }
        // Respond back to the callback handler
        res.status(200).json({
            message: "Callback processed successfully",
            data: responseData,
        });
    }
    catch (error) {
        console.log("Error in STK Push Callback: ", error);
        res.status(500).json({
            message: "Failed",
            error: error.message,
        });
    }
});
exports.stkPushCallback = stkPushCallback;
