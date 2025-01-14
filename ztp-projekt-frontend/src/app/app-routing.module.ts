import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {MAIN_ROUTES} from "./main/main.routes";
import {IsUserLoggedInGuard} from "./auth/is-user-logged-in.guard";

const routes: Routes = [
  {path: '',
    component: LayoutComponent,
    // canActivate: [IsUserLoggedInGuard],
    children: [
      {
        path: 'main',
        loadComponent: () => import('./main/main.component').then((m) => m.MainComponent)
      },
      {
        path: 'fields',
        loadComponent: () => import('./fields/fields.component').then((m) => m.FieldsComponent)
      },
    ],

  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent)
  },
  {
    path: 'sign-in-page',
    loadComponent: () => import('./pages/sign-in-page/sign-in-page.component').then((m) => m.SignInPageComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
