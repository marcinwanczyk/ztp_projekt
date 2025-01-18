import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProgressBarModule} from "primeng/progressbar";
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {TopbarComponent} from "./topbar/topbar.component";
import {FieldsComponent} from "../fields/fields.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [CommonModule,
    ProgressBarModule,
    StyleClassModule,
    RippleModule,
    SidebarModule,
    RouterModule,
    ButtonModule, TopbarComponent, FieldsComponent],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}
