import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from './user/user.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CredentialDialogComponent } from './credential-dialog/credential-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPersonalInfoDialogComponent } from './edit-personal-info-dialog/edit-personal-info-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { AddBrandDialogComponent } from './add-brand-dialog/add-brand-dialog.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { StoreModule } from '@ngrx/store';
import { MatTreeModule } from '@angular/material/tree';
import { JwtInterceptor } from 'src/services/jwt.interceptor';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavbarComponent,
    DashBoardComponent,
    UserComponent,
    ProductDetailsComponent,
    CredentialDialogComponent,
    EditPersonalInfoDialogComponent,
    AddUserDialogComponent,
    AddProductDialogComponent,
    AddBrandDialogComponent,
    AddCategoryDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSelectModule,
    StoreModule,
    MatTreeModule,
    JwtModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
