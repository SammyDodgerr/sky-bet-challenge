import { TestBed } from '@angular/core/testing';

import { BetSlipServiceService } from './bet-slip-service.service';

describe('BetSlipServiceService', () => {
  let service: BetSlipServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetSlipServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
