import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private payUrl = "http://localhost:5300/lipa/stkPush";
  private baseUrl = "http://localhost:5300/lipa";

  private socket!: Socket;
  private messageSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    // Connect to WebSocket server
    this.socket = io('http://localhost:5300', {
      transports: ['websocket'],
      withCredentials: true
    });

    // Listen for messages from the server
    this.socket.on('message', (message: string) => {
      this.messageSubject.next(message);
    });

    // Listen for connection and disconnection events
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  // Send a message to the server
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  // Observable to listen for messages from the server
  get messages$() {
    return this.messageSubject.asObservable();
  }

  //make payment
  makePayment(payData: any): Observable<any> {
    return this.http.post(this.payUrl, payData);

  }



}
