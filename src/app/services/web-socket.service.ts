import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ApiMessage, ApiMessageType } from "../api-models";
import { SubscriptionType } from "../subscribe-for-updates/subscribe-for-updates.component";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private url = "ws://localhost:8889";

  private socket: WebSocket | undefined;
  private webSocketReady = new Subject<void>();

  //subject to send all messages on
  private socketMessages = new Subject<ApiMessage>();

  constructor() {
  }

  onRefreshSocket(){
    if(this.socket){
      this.socket.close();
    }
    this.socket = this.create(this.url);
  }

  getWebSocketMessages(): Subject<ApiMessage> {
    return this.socketMessages;
  }

  getWebSocketReady(): Subject<void> {
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
    this.socket?.send(s);
  }

  getWebSocketMessagesWithFilter(subscriptionType: SubscriptionType, subscriptionId: number) {
    let idPath: string;

    switch (subscriptionType) {
      case SubscriptionType.event:
        idPath = 'eventId';
        break;
      case SubscriptionType.market:
        idPath = 'marketId';
        break;
    }

    this.sendRequest(JSON.stringify({type: "subscribe", keys: [`${subscriptionType}.${subscriptionId}`], clearSubscription: false}));
    return this.getWebSocketMessages().pipe(filter(
      message => message.data[idPath] == subscriptionId
    ))
  }

  onUnsubscribe(subscriptionType: SubscriptionType, subscriptionId: number){
    this.sendRequest(JSON.stringify({ type: "unsubscribe", keys: [`${subscriptionType}.${subscriptionId}`] }))
  }
}
