import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./layout.component";
import { TopbarComponent } from './topbar/topbar.component';
import {ProgressBarModule} from "primeng/progressbar";
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [LayoutComponent, TopbarComponent],
    imports: [
        CommonModule,
        ProgressBarModule,
        StyleClassModule,
        RippleModule,
        SidebarModule,
        RouterModule,
        ButtonModule
    ]
})
export class LayoutModule { }
