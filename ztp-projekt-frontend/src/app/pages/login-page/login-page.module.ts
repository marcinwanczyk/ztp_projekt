import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page.component";
import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {BrowserModule} from "@angular/platform-browser";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

const routes: Routes = [
  {
    path: "**",
    component: LoginPageComponent
  }
];

@NgModule({
  declarations: [
    LoginPageComponent
  ],
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        DividerModule,
        RouterModule.forChild(routes),
        FormsModule,
        PanelModule,
        ReactiveFormsModule,
        ToastModule
    ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule{}
