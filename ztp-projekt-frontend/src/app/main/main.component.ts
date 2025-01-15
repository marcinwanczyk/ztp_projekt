import { Component } from '@angular/core';
import {AppRoutingModule} from "../app-routing.module";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
