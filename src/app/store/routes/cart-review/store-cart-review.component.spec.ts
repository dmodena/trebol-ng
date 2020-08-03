import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartReviewComponent } from './store-cart-review.component';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});