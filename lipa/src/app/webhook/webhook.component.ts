import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css']
})
export class WebhookComponent {
  private socket!: Socket;
  constructor() {
    this.socket = io('http://localhost:5300');
  }

  ngOnInit() {
    // Listen for messages from the server
    this.socket.on('message', (message: string) => {
      console.log('Message from server:', message);
    });

    // Handle connection error
    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
    });

    // Handle any other socket errors
    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  sendMessage() {
    // Send a message to the server
    this.socket.emit('clientMessage', 'Hello from Angular!');
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

}
