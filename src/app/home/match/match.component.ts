import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiMessageType, MatchDetail, Outcome, PrimaryMarket } from "../../api-models";
import { WebSocketService } from "../../services/web-socket.service";
import * as _ from 'lodash';
import { UserPreferencesService } from "../../../../deployment/services/user-preferences.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnChanges {

  @Input() match: MatchDetail | undefined;

  public primaryMarket: PrimaryMarket | undefined;
  //map this to id so we only get each outcome once.
  public outcomes: Map<number, Outcome> = new Map();
  private outcomeIdsRetrieved = new Set<string>();

  constructor(private webSocketService: WebSocketService,
    public userPreferences: UserPreferencesService) {
  }

  ngOnInit(): void {
    //get the primary markets so we can toggle them on and off instantly
    this.webSocketService.getWebSocketMessages().subscribe(
      message => {
        if (message.type === ApiMessageType.MarketData && message.data.marketId === _.get(this.match, 'markets[0]')) {
          this.primaryMarket = message.data;
          //send a request for each outcome
          (this.primaryMarket as PrimaryMarket).outcomes.forEach(
            outcomeId => this.webSocketService.sendRequest(JSON.stringify({type: "getOutcome", id: outcomeId}))
          )
        }
        if (message.type === ApiMessageType.OutcomeData &&
          message.data.marketId === _.get(this.match, 'markets[0]')
          && !this.outcomeIdsRetrieved.has(message.data.outcomeId)) {
          this.outcomes.set(message.data.outcomeId, message.data);
        }
      }
    );
  }


  //angular 'hook' for listening to input changes
  ngOnChanges() {
    if (this.match && !this.primaryMarket) {
      this.webSocketService.sendRequest(JSON.stringify({type: "getMarket", id: _.get(this.match, 'markets[0]')}))
    }
  }

}
