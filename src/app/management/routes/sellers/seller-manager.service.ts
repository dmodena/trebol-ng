// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Seller } from 'src/app/data/models/entities/Seller';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class SellerManagerService
  extends DataManagerService<Seller> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sellersCrud) protected dataService: EntityCrudIService<Seller>
  ) {
    super();
  }
}
