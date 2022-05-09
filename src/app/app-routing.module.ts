import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MatchDetailComponent } from "./match-detail/match-detail.component";

// here we define what relative url relates to which base component
const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'event-detail/:event-id', component: MatchDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
