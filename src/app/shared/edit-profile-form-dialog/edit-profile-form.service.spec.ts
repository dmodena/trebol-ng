// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/data/models/entities/Person';
import { EditProfileFormService } from './edit-profile-form.service';

describe('EditProfileFormService', () => {
  let service: EditProfileFormService;
  let appService: Partial<AppService>;

  beforeEach(() => {
    appService = {
      isUserLoggedIn() { return of(true); },
      getUserProfile() { return of(new Person()); },
      updateUserProfile(p) { return of(true); }
    };

    TestBed.configureTestingModule({
      providers: [
        EditProfileFormService,
        { provide: AppService, useValue: appService }
      ]
    });
    service = TestBed.inject(EditProfileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
