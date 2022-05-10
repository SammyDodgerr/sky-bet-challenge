import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { MatchDetail, Outcome, PrimaryMarket } from "../api-models";
import * as _ from 'lodash';
import { UserPreferencesService } from "../../../deployment/services/user-preferences.service";
import { BetSlipServiceService } from "../services/bet-slip-service.service";

@Component({
  selector: 'app-primary-market',
  templateUrl: './primary-market.component.html',
  styleUrls: ['./primary-market.component.scss']
})
export class PrimaryMarketComponent implements OnChanges {
  @Input() primaryMarket: PrimaryMarket | undefined;
  @Input() outcomes: Map<number, Outcome> | undefined;
  @Input() outcomesLoading: boolean | undefined = false;
  @Input() moreOutcomesLoading = false;
  @Input() detailMode = false;
  @Output() showMore = new EventEmitter<void>();
  @Input() event: MatchDetail | undefined;
  public correctScoreData: any = null;


  constructor(public userPrefences: UserPreferencesService,
    private cd: ChangeDetectorRef,
    private betSlipService: BetSlipServiceService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (_.get(this.primaryMarket, 'type') === 'correct-score') {
      //always show all for correct-score for better ux
      //set up a more advanced data storage for a nicer display
      this.correctScoreData = {
        homeTeam: (this.event as MatchDetail).competitors.find(com => com.position === 'home')?.name,
        home: [],
        awayTeam: (this.event as MatchDetail).competitors.find(com => com.position === 'away')?.name,
        away:  []
      };
      this.outcomes?.forEach((outcome, key) => {
        if(outcome.type === 'home'){
          this.correctScoreData.home.push(outcome);
        } else if (outcome.type === 'away'){
          this.correctScoreData.away.push(outcome);
        }
      });
    }
  }

  //logic for switching between display prices
  getPrice(decimal: any) {
    return decimalToFraction(parseFloat(decimal).toFixed(3), this.userPrefences.fractional);
  }

  hasMoreToShow() {
    return _.get(this.primaryMarket, 'outcomes', []).length > _.get(this, 'outcomes', new Map()).size;
  }

  onPriceChange(event: Outcome) {
    console.log(event, this.outcomes, this.outcomes?.has(event.outcomeId), event.eventId === this.event?.eventId, event.marketId === this.primaryMarket?.marketId);
    if (this.outcomes?.has(event.outcomeId)) {
      var oldOutcome = this.outcomes?.get(event.outcomeId) as Outcome;
      _.set(oldOutcome, 'status', event.status);
      _.set(oldOutcome, 'price', event.price);
      _.set(oldOutcome, 'flash', true);
      this.outcomes?.set(event.outcomeId, oldOutcome as Outcome);
      this.cd.detectChanges();
    }
  }

  addToBetSlip(outcome: Outcome) {
    this.betSlipService.addToBetSlip(outcome, this.primaryMarket as PrimaryMarket, this.event?.name);
  }
}

//NB adopted from https://gist.github.com/redteam-snippets/3934258
export function decimalToFraction(_decimal: any, fractional: boolean): string {
  if (!fractional) {
    return parseFloat(_decimal).toFixed(2);
  }
  var top: any = _decimal.toString().replace(/\d+[.]/, '');
  var bottom = Math.pow(10, top.length);
  if (_decimal > 1) {
    top = +top + Math.floor(_decimal) * bottom;
  }
  var x = gcd(top, bottom);
  var values = {
    top: (top / x),
    bottom: (bottom / x),
    //minus 1 here for correct conversion! see betting odds
    display: ((top / x) - (bottom / x)).toString(10).substr(0, 3) + '/' + (bottom / x).toString(10).substr(0, 3)
  };
  return values.display;
}

function gcd(a: number, b: number): number {
  return (b) ? gcd(b, a % b) : a;
}
