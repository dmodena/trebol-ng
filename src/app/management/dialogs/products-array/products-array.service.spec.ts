import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ProductsArrayService } from './products-array.service';

describe('ProductsArrayService', () => {
  let service: ProductsArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ProductsArrayService
      ]
    });
    service = TestBed.inject(ProductsArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});