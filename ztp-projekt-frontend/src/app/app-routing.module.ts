import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
