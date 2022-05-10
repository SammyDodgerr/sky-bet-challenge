import { Component, OnInit } from '@angular/core';
import { WebSocketService } from "../services/web-socket.service";
import { ActivatedRoute, Params } from "@angular/router";
import { ApiMessage, ApiMessageType, MatchDetail, Outcome, PrimaryMarket } from "../api-models";
import { take } from "rxjs/operators";
import * as _ from "lodash";

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
  public eventId: number | undefined;
  private wsReady = false;
  public marketsLoading = true;
  public outcomesLoading = true;
  public eventDetail: MatchDetail | undefined;
  public primaryMarkets = new Map<number, PrimaryMarket>();
  public marketOutcomes = new Map<number, Map<number, Outcome>>();

  //use a debounce to load all the data before rendering the UI
  marketsLoadingDebounce: Function = _.debounce(() => {
    this.marketsLoading = false;
    this.retrieveOutcomes(10);
  }, 500);

  //use a debounce to load all outcomes before showing in the ui
  outcomesLoadingDebounce: Function = _.debounce(() => {
    this.outcomesLoading = false;
  }, 500);

  get showLoading() {
    return !this.eventDetail || this.marketsLoading
  }

  constructor(private webSocketService: WebSocketService,
    private route: ActivatedRoute,
  ) {
    webSocketService.onRefreshSocket();
  }

  ngOnInit(): void {
    //1) subscribe to all messages
    this.webSocketService.getWebSocketMessages().subscribe(
      message => this.onHandleWebSocketMessage(message)
    );

    //2) wait for the websocket to be established
    this.webSocketService.getWebSocketReady()
      .pipe(take(1))
      .subscribe(
        () => {
          //3) possible race condition, wait for both to be ready
          this.wsReady = true;
          this.checkRetrieval();
        }
      );

    // need to hook into the router observable to get the event id from the url
    this.route.params.subscribe((params: Params) => {
      this.eventId = parseInt(params['event-id']);
    });
  }

  private checkRetrieval() {
    if (this.wsReady && this.eventId) {
      this.webSocketService.sendRequest(JSON.stringify({type: "getEvent", id: this.eventId}));
    }
  }

  private onHandleWebSocketMessage(message: ApiMessage) {
    switch (message.type) {
      case ApiMessageType.EventData:
        this.eventDetail = message.data;
        console.log(this.eventDetail);
        this.eventDetail?.markets?.forEach(
          marketId => this.webSocketService.sendRequest(JSON.stringify({type: "getMarket", id: marketId}))
        );
        break;
      case ApiMessageType.MarketData:
        this.primaryMarkets.set(message.data.marketId, message.data);
        this.marketsLoadingDebounce();
        break;
      case ApiMessageType.OutcomeData:
        if (this.marketOutcomes.has(message.data.marketId)) {
          const existingMap = this.marketOutcomes.get(message.data.marketId);
          existingMap?.set(message.data.outcomeId, message.data);
          this.marketOutcomes.set(message.data.marketId, existingMap as Map<number, Outcome>);
        } else {
          const newMap = new Map();
          newMap.set(message.data.outcomeId, message.data);
          this.marketOutcomes.set(message.data.marketId, newMap);
        }
        this.outcomesLoadingDebounce();

    }
  }

  public retrieveOutcomes(limit = Infinity) {
    this.primaryMarkets.forEach((key, market) => {
      key.outcomes.forEach((outcomeId, index) => {
        if (index < limit) {
          this.webSocketService.sendRequest(JSON.stringify({type: "getOutcome", id: outcomeId}))
        }
      });
    })
  }

  public retrieveMoreOutcomes(marketId: number) {
    this.outcomesLoading = true;
    this.primaryMarkets.get(marketId)?.outcomes.forEach((outcomeId, index) => {
      this.webSocketService.sendRequest(JSON.stringify({type: "getOutcome", id: outcomeId}))
    });
  }

  getStartTime() {
    const date = new Date(this.eventDetail?.startTime as string);
    const options: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return date.toLocaleDateString(getLanguage(), options);
  }
}

/**
 * Get the current language in a way that works on the front and back end
 */
export function getLanguage(): string {
  if (typeof window === 'undefined') {
    return 'en-GB';
  } else {
    return window.navigator.language;
  }
}
