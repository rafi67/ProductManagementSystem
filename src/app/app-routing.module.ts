import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { UserComponent } from './user/user.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { authGuard, authGuard2, authGuard3 } from 'src/authentication/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path:'', redirectTo:'/Login', pathMatch:'full'},
  {path: 'Login', component: LoginComponent, canActivate: [authGuard2]},
  {path: 'Home', component: AppComponent, canActivate: [authGuard]},
  {path:'DashBoard', component: DashBoardComponent, canActivate: [authGuard]},
  {path:'User', component: UserComponent, canActivate: [authGuard3]},
  {path:'ProductDetails', component: ProductDetailsComponent, canActivate: [authGuard]},
  {path:'NavBar', component: NavbarComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
