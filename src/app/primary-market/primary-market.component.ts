import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { MatchDetail, Outcome, PrimaryMarket } from "../api-models";
import * as _ from 'lodash';
import { UserPreferencesService } from "../../../deployment/services/user-preferences.service";
import { BetSlipServiceService } from "../services/bet-slip-service.service";
import Fraction from "fraction.js";

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
    return decimalToFraction(parseFloat(decimal), this.userPrefences.fractional);
  }

  hasMoreToShow() {
    return _.get(this.primaryMarket, 'outcomes', []).length > _.get(this, 'outcomes', new Map()).size;
  }

  onPriceChange(event: Outcome) {
    if (this.outcomes?.has(event.outcomeId)) {
      const oldOutcome = this.outcomes?.get(event.outcomeId) as Outcome;
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

export function decimalToFraction(_decimal: any, fractional: boolean): string {
  if (!fractional) {
    return parseFloat(_decimal).toFixed(2);
  }
  _decimal--;
  const fraction = new Fraction(_decimal).toFraction();
  return fraction.includes('/') ? fraction : `${fraction}/1`;
}
