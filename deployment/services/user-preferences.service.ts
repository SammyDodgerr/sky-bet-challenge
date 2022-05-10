import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  public showPrimaryMarkets = false;
  public fractional = false;
}
