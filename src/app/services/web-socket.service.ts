import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from "rxjs";
import { ApiMessage } from "../api-models";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  //replay subject, to allow new subscribers to know if the connection has already been established.
  private webSocketReady = new ReplaySubject<void>();

  //subject to send all messages on
  private socketMessages = new Subject<ApiMessage>();

  constructor() {
    //create the socket
    this.socket = this.create("ws://localhost:8889");
  }

  getWebSocketMessages(): Subject<ApiMessage> {
    return this.socketMessages;
  }

  getWebSocketReady(): ReplaySubject<void> {
    return this.webSocketReady;
  }

  private create(url: string): WebSocket {
    const ws = new WebSocket(url);
    ws.onopen = (event) => {
      console.log('WebSocket has been established.');
      this.webSocketReady.next();
    };
    ws.onmessage = (event) => {
      //send all messages via the rxjs subject
      this.socketMessages.next(JSON.parse(event.data));
    };
    ws.onerror = (event) => {
      console.error("Error with WebSocket!");
    };
    ws.onclose = (event) => {
      console.info('WebSocket closed.')
    };
    return ws;
  }

  sendRequest(s: string) {
    this.socket.send(s);
  }
}
