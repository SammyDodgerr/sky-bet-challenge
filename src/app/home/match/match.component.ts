import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiMessageType, FootballMatch, OutcomeData, PrimaryMarkets } from "../../api-models";
import { WebSocketService } from "../../services/web-socket.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnChanges {

  @Input() match: FootballMatch | undefined;
  @Input() showPrimaryMarkets: boolean | undefined;
  @Input() showFractionalPrice: boolean | undefined;

  public primaryMarkets: PrimaryMarkets | undefined;
  //map this to id so we only get each outcome once.
  public outcomes: Map<String, OutcomeData> = new Map();
  private outcomeIdsRetrieved = new Set<string>();

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    //get the primary markets so we can toggle them on and off instantly
    this.webSocketService.getWebSocketMessages().subscribe(
      message => {
        if (message.type === ApiMessageType.MarketData && message.data.marketId === _.get(this.match, 'markets[0]')) {
          this.primaryMarkets = message.data;
          console.log(this.primaryMarkets);
          //send a request for each outcome
          (this.primaryMarkets as PrimaryMarkets).outcomes.forEach(
            outcomeId => this.webSocketService.sendRequest(JSON.stringify({type: "getOutcome", id: outcomeId}))
          )
        }
        if (message.type === ApiMessageType.OutcomeData &&
          message.data.marketId === _.get(this.match, 'markets[0]')
          && !this.outcomeIdsRetrieved.has(message.data.outcomeId)) {
          this.outcomes.set(message.data.outcomeId, message.data);
          console.log(this.outcomes);
        }
      }
    );
  }


  //angular 'hook' for listening to input changes
  ngOnChanges() {
    if (this.match && !this.primaryMarkets) {
      this.webSocketService.sendRequest(JSON.stringify({type: "getMarket", id: _.get(this.match, 'markets[0]')}))
    }
  }

  //logic for switching between display prices
  getPrice(decimal: any) {
    console.log(decimal);
    return this.showFractionalPrice ? this.decimalToFraction(decimal).display : Number(parseFloat(decimal as string).toPrecision(3));
  }

  //NB adopted from https://gist.github.com/redteam-snippets/3934258
  //todo handle ridiculously long numbers better!
  decimalToFraction(_decimal: number) {
    var top: any = _decimal.toString().replace(/\d+[.]/, '');
    var bottom = Math.pow(10, top.length);
    if (_decimal > 1) {
      top = +top + Math.floor(_decimal) * bottom;
    }
    var x = gcd(top, bottom);
    return {
      top: (top / x),
      bottom: (bottom / x),
      display: (top / x) + '/' + (bottom / x)
    };
  };
}

function gcd(a: number, b: number): number {
  return (b) ? gcd(b, a % b) : a;
}
