import { Component, OnInit } from '@angular/core';
import { WebSocketService } from "../services/web-socket.service";
import { ApiMessageType, FootballMatch } from "../api-models";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private webSocketService: WebSocketService) {
  }

  public allMatches: FootballMatch[] = [];
  public showPrimaryMarkets = false;
  public fractional = false;

  ngOnInit(): void {
    //1) subscribe to all messages
    this.webSocketService.getWebSocketMessages().subscribe(
      message => this.onHandleWebSocketMessage(message)
    );

    //2) wait for the websocket to be established
    this.webSocketService.getWebSocketReady()
      .pipe(take(1))
      .subscribe(
        () =>
          //3) send our initial request to retrieve all football matches
        this.getAllMatches()
      )
  }

  private getAllMatches(){
    //always get primary markets, let the UI decide whether or not to show them
    this.webSocketService.sendRequest(JSON.stringify({type: "getLiveEvents", primaryMarkets: true}));
  }

  private onHandleWebSocketMessage(message: any) {
    switch (message.type as ApiMessageType){
      case ApiMessageType.LiveEventsData:
        this.allMatches = message.data;
        console.log(this.allMatches);
    }
  }

  onTogglePrimaryMarkets(event: MatSlideToggleChange) {
    this.showPrimaryMarkets = event.checked;
  }

  onToggleOddsDisplay(event: MatSlideToggleChange) {
    this.fractional = event.checked;
  }
}