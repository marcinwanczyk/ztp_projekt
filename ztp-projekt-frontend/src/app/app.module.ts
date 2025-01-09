import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {LayoutModule} from "./layout/layout.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    LayoutModule
  ],
  providers: [{provide: MessageService, useClass: MessageService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
