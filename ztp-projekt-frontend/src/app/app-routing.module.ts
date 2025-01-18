import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./auth/auth.guard";
import {loginPageGuard} from "./auth/login-page.guard";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    canActivate: [loginPageGuard]
  },
  {
    path: 'sign-in-page',
    loadComponent: () => import('./pages/sign-in-page/sign-in-page.component').then((m) => m.SignInPageComponent),
    canActivate: [loginPageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
