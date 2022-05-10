import { Component } from '@angular/core';
import { IconRegistryService } from "./services/icon-registry.service";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { UserPreferencesService } from "../../deployment/services/user-preferences.service";
import { NavigationEnd, Router } from "@angular/router";
import { BetSlipServiceService } from "./services/bet-slip-service.service";
import { Outcome } from "./api-models";
import { decimalToFraction } from "./primary-market/primary-market.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public bets = new Map<any, Map<any, Outcome>>();


  constructor(private iconRegistry: IconRegistryService,
    private router: Router,
    private betSlipService: BetSlipServiceService,
    public userPreferences: UserPreferencesService) {
    router.events
      .subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.inOverviewUI = !val.urlAfterRedirects.includes('event-detail');
        }
      });

    betSlipService.getBets().subscribe(
      bets => {
        this.bets = bets;
      }
    )
  }

  title = 'sky-bet-test';
  inOverviewUI = true;

  onTogglePrimaryMarkets(event: MatSlideToggleChange) {
    this.userPreferences.showPrimaryMarkets = event.checked;
  }

  onToggleOddsDisplay(event: MatSlideToggleChange) {
    this.userPreferences.fractional = event.checked;
  }

  //logic for switching between display prices
  getPrice(decimal: any) {
    return decimalToFraction(parseFloat(decimal).toFixed(3), this.userPreferences.fractional);
  }

  onClearBetSlip() {
    this.betSlipService.clear();
  }
}
