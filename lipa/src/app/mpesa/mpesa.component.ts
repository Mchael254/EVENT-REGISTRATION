import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentsService } from '../services/payments.service';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-mpesa',
  templateUrl: './mpesa.component.html',
  styleUrls: ['./mpesa.component.css']
})
export class MpesaComponent implements OnInit, OnDestroy {


  private socket!: Socket;
  constructor(private payService: PaymentsService, private http: HttpClient) {
    this.socket = io("http://localhost:5300");
  }

  receivedMessage: string = '';
  messageToSend: string = '';



  userName: string = "";
  phone: string = "";
  category: string = "";
  form: boolean = true;
  payForm: boolean = false;
  error: string = "";
  mpesa: boolean = false;
  amount: number = 1;
  Order_ID: number = 1234;
  status: string = '';
  mpesaSpinner: boolean = true;
  errorResponse: boolean = false;
  successResponse: boolean = false;


  convertToInternationalFormat(phone: string): string {
    return '254' + phone.substring(1);
  }


  initiatePay() {
    //check all fields are filled
    if (this.userName == "" || this.phone == "" || this.category == "") {
      this.error = "All fields are required";
      setTimeout(() => {
        this.error = "";
      }, 3000);
      return;
    } else {
      if (this.phone.length < 10 || this.phone.length > 10) {
        this.error = "Phone number should be 10 digits";
        setTimeout(() => {
          this.error = "";
        }, 3000);
        return
      }
    }
    this.form = false;
    this.payForm = true;

  }

  editDetails() {
    this.form = true;
    this.payForm = false;
  }

  phones: string = "";
  errorMessage: string = ""
  successMessage: string = "";


  payMpesa() {
    this.mpesaSpinner = true;
    this.phones = this.convertToInternationalFormat(this.phone);
    this.payForm = false;
    this.mpesa = true;
    //send request to mpesa
    const payData = {
      phone: this.phones,
      amount: this.amount,
      Order_ID: this.Order_ID,
    }

    console.log(payData.phone);

    //call the service
    this.payService.makePayment(payData).subscribe(
      (response) => {
        console.log("payment started");
        console.log(response);

      },
      (error) => {
        console.error("Error during payment:", error);
        this.mpesaSpinner = false;
        this.errorResponse = true;
        this.errorMessage = "Something went wrong, check your internet connections and try again";

        if (error.error) {
          console.error(error.error.error.errorMessage);
          this.errorMessage = error.error.error.errorMessage;
          this.mpesaSpinner = false;
          this.errorResponse = true;

        } else {
          console.error("An error occurred");
          this.mpesaSpinner = false;
          this.errorMessage = "An error occurred";
        }

      }

    )

  }

  transactionStatus: string = "";
  transactionMessage: string = "";
  timeoutHandle: any;
  ngOnInit(): void {
    // Start a timeout to stop the spinner after a specific duration
    this.timeoutHandle = setTimeout(() => {
      if (this.mpesaSpinner) {
        this.mpesaSpinner = false; // Stop the spinner
        this.errorResponse = true; // Show an error message
        this.errorMessage = 'Transaction timeout. Please try again.';
        console.log('Transaction timed out.');
      }
    }, 50000); // 30 seconds timeout

    // Listen for transaction updates
    this.socket.on("transactionUpdate", (data: any) => {
      console.log("Transaction Update:", data);
      console.log("Transaction Status:", data.status);

      this.transactionStatus = data.status;
      this.transactionMessage = data.message;

      if (data.status === "canceled") {
        this.errorResponse = true;
        this.mpesaSpinner = false;
        this.errorMessage = "You canceled the transaction.";
        console.log("The user canceled the transaction.");

      } else if (data.status === "failed") {
        alert("The transaction failed or was not completed.");
        this.errorResponse = true;
        this.mpesaSpinner = false;
        this.errorMessage = "The transaction failed or was not completed.";
      } else if (data.status === "success") {
        alert("Transaction successful");
        this.mpesaSpinner = false;
        this.successResponse = true;
        this.successMessage = "Transaction successful";
      } else {
        alert("An error occurred");
        this.mpesaSpinner = false;
        this.errorResponse = true;
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup logic here
    this.socket.disconnect();
  }


}


