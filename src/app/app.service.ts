// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, ReplaySubject } from 'rxjs';
import { catchError, finalize, map, mapTo, tap } from 'rxjs/operators';
import { AUTH_INJECTION_TOKEN } from 'src/app/auth/auth.injection-token';
import { AuthenticationIService } from 'src/app/auth/auth.iservice';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { Login } from 'src/app/data/models/Login';
import { AuthorizedAccess } from './data/models/AuthorizedAccess';

@Injectable({ providedIn: 'root' })
export class AppService
  implements OnDestroy {

  protected isLoggedInChangesSource: Subject<boolean> = new BehaviorSubject(false);
  protected isValidatingSessionSource: Subject<boolean> = new BehaviorSubject(false);

  public isLoggedInChanges$: Observable<boolean> = this.isLoggedInChangesSource.asObservable();
  public isValidatingSession$: Observable<boolean> = this.isValidatingSessionSource.asObservable();

  constructor(
    @Inject(AUTH_INJECTION_TOKEN) protected authService: AuthenticationIService
  ) {
    this.fetchLoggedInState().subscribe();
  }

  public get isLoggedIn(): boolean {
    return (this.isLoggedInChangesSource as BehaviorSubject<boolean>)?.getValue();
  }

  ngOnDestroy(): void {
    this.isLoggedInChangesSource.complete();
    this.isValidatingSessionSource.complete();
  }

  protected fetchLoggedInState(): Observable<boolean> {
    return this.authService.getAuthorizedAccess().pipe(
      mapTo(true),
      catchError(() => of(false)),
      tap(
        r => {
          this.isLoggedInChangesSource.next(r);
        }
      )
    );
  }

  public isUserLoggedIn(): Observable<boolean> {
    const isCurrentlyLoggedIn = this.isLoggedIn;
    if (isCurrentlyLoggedIn === null) {
      return this.fetchLoggedInState();
    } else {
      return of(isCurrentlyLoggedIn);
    }
  }

  public guestLogin(personDetails: Person): Observable<boolean> {
    return this.authService.guestLogin(personDetails);
  }

  public register(userDetails: User): Observable<boolean> {
    return this.authService.register(userDetails).pipe(
      tap( //TODO refactor this tap
        success => {
          this.isLoggedInChangesSource.next(true);
        }
      )
    );
  }

  public login(credentials: Login): Observable<boolean> {
    if (this.isLoggedIn) {
      return of(true);
    } else {
      return this.authService.login(credentials).pipe(
        tap( //TODO and this tap too
          success => {
            this.isLoggedInChangesSource.next(true);
          }
        )
      );
    }
  }

  public validateSession(): Observable<boolean> {
    this.isValidatingSessionSource.next(true);

    return this.authService.getAuthorizedAccess().pipe(
      mapTo(true),
      catchError(() => of(false)),
      finalize(() => { this.isValidatingSessionSource.next(false); }),
      tap(isValid => { if (!isValid) { this.closeCurrentSession(); } })
    );
  }

  public getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.isLoggedIn ? this.authService.getAuthorizedAccess() : of(null);
  }

  public getUserProfile(): Observable<Person> {
    return this.authService.getProfile();
  }

  public updateUserProfile(details: Person): Observable<boolean> {
    return this.authService.updateProfile(details);
  }

  public closeCurrentSession(): void {
    this.isLoggedInChangesSource.next(false);
    this.authService.logout().subscribe();
  }

}
