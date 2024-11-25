import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookComponent } from './webhook.component';

describe('WebhookComponent', () => {
  let component: WebhookComponent;
  let fixture: ComponentFixture<WebhookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebhookComponent]
    });
    fixture = TestBed.createComponent(WebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
