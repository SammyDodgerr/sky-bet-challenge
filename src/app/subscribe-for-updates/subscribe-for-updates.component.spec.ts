import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeForUpdatesComponent } from './subscribe-for-updates.component';

describe('SubscribeForUpdatesComponent', () => {
  let component: SubscribeForUpdatesComponent;
  let fixture: ComponentFixture<SubscribeForUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeForUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeForUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
