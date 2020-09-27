import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementDataActionsComponent } from './data-actions/management-data-actions.component';
import { ProductsArrayDialogComponent } from './dialogs/products-array/products-array-dialog.component';
import { ProductsArrayService } from './dialogs/products-array/products-array.service';
import { ManagementFooterComponent } from './footer/management-footer.component';
import { ManagementHeaderComponent } from './header/management-header.component';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { ClientManagerComponent } from './routes/clients/client-manager.component';
import { ClientManagerService } from './routes/clients/client-manager.service';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { EmployeeManagerComponent } from './routes/employees/employee-manager.component';
import { EmployeeManagerService } from './routes/employees/employee-manager.service';
import { EmployeeManagerFormDialogComponent } from './routes/employees/form-dialog/employee-manager-form-dialog.component';
import { ProductManagerFormDialogComponent } from './routes/products/form-dialog/product-manager-form-dialog.component';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { ProductManagerService } from './routes/products/product-manager.service';
import { SellManagerFormDialogComponent } from './routes/sales/form-dialog/sell-manager-form-dialog.component';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { SellManagerService } from './routes/sales/sell-manager.service';
import { UserManagerFormDialogComponent } from './routes/users/form-dialog/user-manager-form-dialog.component';
import { UserManagerComponent } from './routes/users/user-manager.component';
import { UserManagerService } from './routes/users/user-manager.service';
import { ManagementSidenavComponent } from './sidenav/management-sidenav.component';

const SNACKBAR_DEFAULTS: MatSnackBarConfig = {
  duration: 5000
};

@NgModule({
  declarations: [
    ManagementComponent,
    ManagementHeaderComponent,
    ManagementFooterComponent,
    ManagementSidenavComponent,
    ProductsArrayDialogComponent,
    ManagementDataActionsComponent,
    ManagementDashboardComponent,
    ClientManagerComponent,
    EmployeeManagerComponent,
    EmployeeManagerFormDialogComponent,
    ProductManagerComponent,
    ProductManagerFormDialogComponent,
    SellManagerComponent,
    SellManagerFormDialogComponent,
    UserManagerComponent,
    UserManagerFormDialogComponent,
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS },
    ManagementRoutingGuard,
    ManagementService,
    ClientManagerService,
    EmployeeManagerService,
    ProductManagerService,
    UserManagerService,
    SellManagerService
  ]
})
export class ManagementModule { }