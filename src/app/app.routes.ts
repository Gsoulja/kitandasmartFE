
import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/components/login/login.component';
import {MenuComponent} from './shared/menu/menu.component';
import {TakePhotoComponent} from './features/take-photo/take-photo.component';
import {AddPriceComponent} from './features/add-price/add-price.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {authGuard} from './core/guard/auth.guard';
import {MagicTokenComponent} from './features/auth/components/magic-token/magic-token.component';

export const routes: Routes = [  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'magictoken', component: MagicTokenComponent },
  { path: 'menu', component: MenuComponent, canActivate: [authGuard]},
  { path: 'take-photo', component: TakePhotoComponent ,canActivate: [authGuard]},
  { path: 'add-price', component: AddPriceComponent ,canActivate: [authGuard]},
  { path: 'dashboard', component: DashboardComponent ,canActivate: [authGuard]}];
