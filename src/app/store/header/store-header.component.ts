// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { APP_INITIALS_TITLE, APP_LONG_TITLE } from 'src/app/app.constants';
import { AppService } from 'src/app/app.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EditProfileFormDialogComponent } from 'src/app/shared/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { LOGOUT_MESSAGE } from 'src/text/messages';
import { StoreCompanyDetailsDialogComponent } from '../dialogs/company-details/store-company-details-dialog.component';
import { StoreLoginFormDialogComponent } from '../dialogs/login-form/store-login-form-dialog.component';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.css']
})
export class StoreHeaderComponent
  implements OnInit {

  public cartHasItems$: Observable<boolean>;
  public itemQuantityLabel$: Observable<string>;
  public cartSubtotalValue$: Observable<number>;
  public isLoggedIn$: Observable<boolean>;

  public readonly desktopTitle: string = APP_LONG_TITLE;
  public readonly mobileTitle: string = APP_INITIALS_TITLE;

  public userName$: Observable<string>;
  public canNavigateManagement$: Observable<boolean>;

  constructor(
    protected storeService: StoreService,
    protected appService: AppService,
    protected snackBarService: MatSnackBar,
    protected dialogService: MatDialog,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.cartHasItems$ = this.storeService.sellDetails$.pipe(
      map(array => array.length > 0)
    );
    this.itemQuantityLabel$ = this.storeService.itemQuantity$.pipe(
      map(total => total + ' item' + (total > 1 ? 's' : ''))
    );
    this.cartSubtotalValue$ = this.storeService.sellSubtotalValue$.pipe();
    this.isLoggedIn$ = this.appService.isLoggedInChanges$.pipe();

    this.userName$ = this.appService.isLoggedInChanges$.pipe(
      switchMap(
        (isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            return of('');
          } else {
            return this.appService.getUserProfile().pipe(pluck('name'));
          }
        }
      )
    );

    this.canNavigateManagement$ = this.appService.isLoggedInChanges$.pipe(
      switchMap(
        (isLoggedIn: boolean) => {
          return of(true);
        }
      )
    );
  }

  protected promptLogoutConfirmation(): Observable<boolean> {
    const dialogData: ConfirmationDialogData = {
      title: '¿Cerrar sesion?',
      message: 'Si esta realizando una transaccion, perdera la informacion que haya guardado.'
    };

    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

  protected promptManagementRedirect(): void {
    const dialogData: ConfirmationDialogData = {
      title: 'Ha ingresado como administrador',
      message: '¿Desea ingresar al portal de gestión?'
    };
    this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed().subscribe(
      (resp: boolean) => {
        if (resp) {
          this.router.navigateByUrl('/management');
        }
      }
    );
  }

  public onClickViewCompanyDetails(): void {
    this.dialogService.open(
      StoreCompanyDetailsDialogComponent
    );
  }

  public onClickLogIn(): void {
    this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem'
      }
    ).afterClosed().subscribe();
    // TODO reimplement this somehow?
    //   () => {
    //     const ssn = this.appService.isUserLoggedIn();
    //     if (ssn.user?.seller?.role.id === SellerRolesEnum.Administrador) {
    //       this.promptManagementRedirect();
    //     }
    //   }
    // );
  }

  public onClickEditProfile(): void {
    this.dialogService.open(
      EditProfileFormDialogComponent,
      {
        width: '60rem'
      }
    );
  }

  public onClickLogout(): void {
    this.promptLogoutConfirmation().subscribe(
      confirmed => {
        if (confirmed) {
          this.snackBarService.open(LOGOUT_MESSAGE, 'OK');
          this.appService.closeCurrentSession();
        }
      }
    );
  }

}
