import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule)
  },
  {
    path: 'sign-in-page',
    loadChildren: () => import('./pages/sign-in-page/sign-in.module').then((m) => m.SignInModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
