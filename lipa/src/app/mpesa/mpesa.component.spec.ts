import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaComponent } from './mpesa.component';

describe('MpesaComponent', () => {
  let component: MpesaComponent;
  let fixture: ComponentFixture<MpesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MpesaComponent]
    });
    fixture = TestBed.createComponent(MpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
