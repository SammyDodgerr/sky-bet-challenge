import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Outcome, PrimaryMarket } from "../api-models";
import * as _ from 'lodash';

@Component({
  selector: 'app-primary-market',
  templateUrl: './primary-market.component.html',
  styleUrls: ['./primary-market.component.scss']
})
export class PrimaryMarketComponent implements OnInit, OnChanges {
  @Input() showFractionalPrice: boolean | undefined;
  @Input() primaryMarket: PrimaryMarket | undefined;
  @Input() outcomes: Map<number, Outcome> | undefined;
  @Input() outcomesLoading = false;
  @Input() moreOutcomesLoading = false;
  @Input() detailMode = false;
  @Output() showMore = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.outcomes?.forEach(match => console.log(match.status.displayable));
  }

  //logic for switching between display prices
  getPrice(decimal: any) {
    return this.showFractionalPrice ? this.decimalToFraction(decimal).display : Number(
      parseFloat(decimal as string).toPrecision(3));
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

  hasMoreToShow() {
    return _.get(this.primaryMarket, 'outcomes', []).length > _.get(this, 'outcomes', new Map()).size;
  }
}

function gcd(a: number, b: number): number {
  return (b) ? gcd(b, a % b) : a;
}
