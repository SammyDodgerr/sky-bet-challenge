import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WebSocketService } from "../services/web-socket.service";
import { ApiMessage, ApiMessageType } from "../api-models";
import { Subscription } from "rxjs";

export enum SubscriptionType{
  event = 'e',
  market = 'm'
}

@Component({
  selector: 'app-subscribe-for-updates',
  templateUrl: './subscribe-for-updates.component.html',
  styleUrls: ['./subscribe-for-updates.component.scss']
})
export class SubscribeForUpdatesComponent {

  @Input() subscriptionType: SubscriptionType = SubscriptionType.market;
  @Input() subscriptionId: number | undefined;
  @Output() priceChange = new EventEmitter();

  websocketSubscription: Subscription | null = null;

  subscriptionActive = false;

  constructor(private webSocketService: WebSocketService) { }

  onSubscribe() {
    this.subscriptionActive = true;
    this.websocketSubscription = this.webSocketService.getWebSocketMessagesWithFilter(this.subscriptionType, this.subscriptionId as number).subscribe(
      message => this.onHandleMessage(message)
    );
  }

  onUnsubscribe(){
    if(this.websocketSubscription){
      this.websocketSubscription.unsubscribe();
      this.websocketSubscription = null;
    }
    this.subscriptionActive = false;
    this.webSocketService.sendRequest(JSON.stringify({type: "unsubscribe", keys: [`${this.subscriptionType}.${this.subscriptionId}`]}));
  }

  private onHandleMessage(message: ApiMessage) {
    if(message.type === ApiMessageType.PriceChange){
      this.priceChange.emit(message.data);
    }
  }
}
