import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturePaymentsComponent } from './future-payments.component';

describe('FuturePaymentsComponent', () => {
  let component: FuturePaymentsComponent;
  let fixture: ComponentFixture<FuturePaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuturePaymentsComponent]
    });
    fixture = TestBed.createComponent(FuturePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
