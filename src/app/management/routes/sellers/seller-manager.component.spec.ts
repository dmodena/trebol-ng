import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/app/shared/angular-material.module';
import { SellerManagerComponent } from './seller-manager.component';
import { SellerManagerService } from './seller-manager.service';

describe('SellerManagerComponent', () => {
  let component: SellerManagerComponent;
  let fixture: ComponentFixture<SellerManagerComponent>;
  let managerService: Partial<SellerManagerService>;

  beforeEach(async(() => {
    managerService = {
      removeItems() { return of([true]); },
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([])
    };

    TestBed.configureTestingModule({
      imports: [
        ...MATERIAL_MODULES,
        RouterTestingModule
      ],
      declarations: [ SellerManagerComponent ],
      providers: [
        { provide: SellerManagerService, useValue: managerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});