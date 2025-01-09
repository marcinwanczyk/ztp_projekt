import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInPageComponent} from "./sign-in-page.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "../login-page/login-page.component";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

const routes: Routes = [
  {
    path: "**",
    component: SignInPageComponent
  }
];


@NgModule({
  declarations: [SignInPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  exports: [SignInPageComponent]
})
export class SignInModule { }
