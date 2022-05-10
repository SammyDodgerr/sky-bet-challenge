import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryMarketComponent } from './primary-market.component';

describe('PrimaryMarketComponent', () => {
  let component: PrimaryMarketComponent;
  let fixture: ComponentFixture<PrimaryMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
