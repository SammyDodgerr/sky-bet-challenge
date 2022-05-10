import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ApiMessage, ApiMessageType, Outcome, PrimaryMarket } from "../api-models";
import { WebSocketService } from "./web-socket.service";
import * as _ from "lodash";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BetSlipServiceService {

  //map of eventid, to map of outcome id and outcome
  bets = new Map<any, Map<any, Outcome>>();
  betsSub = new Subject<Map<any, Map<any, Outcome>>>();

  constructor(private webSocketService: WebSocketService) {
    webSocketService.getWebSocketMessages().subscribe(
      result => this.onHandleWsSocketMessage(result)
    )

  }

  getBets(): Subject<Map<any, Map<any, Outcome>>> {
    return this.betsSub;
  }

  clear() {
    this.bets = new Map();
    this.betsSub.next(this.bets);
  }

  addToBetSlip(outcome: Outcome, market: PrimaryMarket, eventName: any) {
    if (this.bets.has(`${eventName} : ${market.name}`)) {
      var existingOutcomes = this.bets.get(`${eventName} : ${market.name}`);
      existingOutcomes?.set(outcome.outcomeId, outcome);
      this.bets?.set(`${eventName} : ${market.name}`, existingOutcomes as Map<any, Outcome>);
    } else {
      var newOutcomes = new Map();
      newOutcomes.set(outcome.outcomeId, outcome);
      this.bets.set(`${eventName} : ${market.name}`, newOutcomes as Map<any, Outcome>);
    }

    this.betsSub.next(this.bets);
    this.webSocketService.sendRequest(JSON.stringify({type: "subscribe", keys: [`o.${outcome.outcomeId}`]}));
  }

  //handle price changes to bets!
  private onHandleWsSocketMessage(result: ApiMessage) {
    const eventId = _.get(result, 'data.eventId');
    const outcomeId = _.get(result, 'data.outcomeId');
    if (result.type === ApiMessageType.PriceChange && this.bets?.has(eventId) && this.bets.get(eventId)?.has(outcomeId)) {
      var oldOutcome = this.bets.get(eventId)?.get(outcomeId) as Outcome;
      _.set(oldOutcome, 'status', _.get(result, 'data.status'));
      _.set(oldOutcome, 'price', _.get(result, 'data.price'));
      _.set(oldOutcome, 'flash', true);
      this.bets.get(eventId)?.set(outcomeId, oldOutcome);
    }
  }
}
