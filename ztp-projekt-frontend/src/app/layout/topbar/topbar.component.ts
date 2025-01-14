import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, Subscription} from "rxjs";
// import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Button} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [
    Button,
    CommonModule,
    StyleClassModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy{
  private subs: Subscription[] = [];

  showSearchBar: boolean = false;
  searchFields: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.subs.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event) => {
        this.showSearchBar = this.router.url === '/fields';
      }),
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe((event) => {
        this.searchFields = '';
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onSearchChange(event: any) {
    this.searchService.setSearchTerm(event.target.value);
  }

}
