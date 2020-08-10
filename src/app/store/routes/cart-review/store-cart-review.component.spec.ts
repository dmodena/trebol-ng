import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartReviewComponent } from './store-cart-review.component';
import { StoreCartService } from '../../store-cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { AppUserService } from 'src/app/app-user.service';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let cartService: Partial<StoreCartService>;
  let userService: Partial<AppUserService>;

  beforeEach(async(() => {
    cartService = {
      sellDetails$: of([]),
      sellSubtotalValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    userService = {
      getCurrentSession() { return null; }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ StoreCartReviewComponent ],
      providers: [
        { provide: StoreCartService, useValue: cartService },
        { provide: AppUserService, useValue: userService }
      ]
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
