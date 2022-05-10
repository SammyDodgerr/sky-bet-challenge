import { ComponentFixture, TestBed } from '@angular/core/testing';

import { decimalToFraction, PrimaryMarketComponent } from './primary-market.component';
import { HideDisplayablePipe } from "../shared/pipes/hide-displayable.pipe";

describe('PrimaryMarketComponent', () => {
  let component: PrimaryMarketComponent;
  let fixture: ComponentFixture<PrimaryMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryMarketComponent, HideDisplayablePipe ]
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

  it('should convert decimal odds correctly', () => {
    const decimal = 1.03;
    expect(decimalToFraction(decimal, true)).toEqual('3/100')
  });

  it('should convert decimal odds even string', () => {
    const decimal = '1.03';
    expect(decimalToFraction(decimal, true)).toEqual('3/100')
  });

  it('should convert decimal odds correctly', () => {
    const decimal = 6.000;
    expect(decimalToFraction(decimal, false)).toEqual('6.00')
  });

  it('should convert decimal odds correctly', () => {
    const decimal = 6.000;
    expect(decimalToFraction(decimal, true)).toEqual('5/1')
  });

  it('should convert decimal odds correctly', () => {
    const decimal = 2.62;
    expect(decimalToFraction(decimal, true)).toEqual('81/50')
  });

  it('should convert decimal odds correctly', () => {
    const decimal = 14;
    expect(decimalToFraction(decimal, true)).toEqual('13/1')
  });
});
