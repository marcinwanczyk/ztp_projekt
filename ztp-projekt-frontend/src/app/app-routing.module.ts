import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {MAIN_ROUTES} from "./main/main.routes";

const routes: Routes = [
  {path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'main',
        loadComponent: () => import('./main/main.component').then((m) => m.MainComponent)
      },
      {
        path: 'fields',
        loadComponent: () => import('./fields/fields.component').then((m) => m.FieldsComponent)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent)
  },
  {
    path: 'sign-in-page',
    loadChildren: () => import('./pages/sign-in-page/sign-in-page.component').then((m) => m.SignInPageComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
