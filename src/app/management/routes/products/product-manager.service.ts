import { Inject, Injectable } from '@angular/core';
import { Product } from 'src/app/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class ProductManagerService
  extends DataManagerService<Product> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected dataService: EntityCrudIService<Product>
  ) {
    super();
  }
}