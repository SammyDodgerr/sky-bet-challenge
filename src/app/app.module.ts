import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatchComponent } from './home/match/match.component';
import { CommonModule } from "@angular/common";
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatIconModule } from "@angular/material/icon";
import { IconRegistryService } from "./services/icon-registry.service";
import { HttpClientModule } from "@angular/common/http";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PrimaryMarketComponent } from './primary-market/primary-market.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { DisplayOrderSortPipe } from './shared/pipes/display-order-sort.pipe';
import { HideDisplayablePipe } from './shared/pipes/hide-displayable.pipe';
import { SubscribeForUpdatesComponent } from './subscribe-for-updates/subscribe-for-updates.component';
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchComponent,
    MatchDetailComponent,
    PrimaryMarketComponent,
    DisplayOrderSortPipe,
    HideDisplayablePipe,
    SubscribeForUpdatesComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatTabsModule
    ],
  providers: [IconRegistryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
