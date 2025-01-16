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
import {AuthService} from "../../auth/auth.service";
import {UiHelperService} from "../../ui-helper.service";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {Reservation} from "../../reservation/Reservation";
import {ReservationsService} from "../../reservation/reservations.service";

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
    OverlayPanelModule,
  ],
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy{
  private subs: Subscription[] = [];

  showSearchBar: boolean = false;
  searchFields: string = '';
  username: string | null = null;
  reservations: Reservation[] = []

  constructor(
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService,
    private uiHelper: UiHelperService,
    private reservationService: ReservationsService
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
      }),
      this.authService.getAuth().subscribe((auth) => {
        this.username = auth.username;
      })
    )
    this.reservationService.getReservationsForUser().then((reservations) => { this.reservations = reservations });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onSearchChange(event: any) {
    this.searchService.setSearchTerm(event.target.value);
  }

  onLogoutClick() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.authService.logout().then(() => {
      this.uiHelper.showMessageOperationSuccesful("Wylogowano");
      this.router.navigate(['/login'])
    });
  }

  onFieldsButtonClick() {
    this.router.navigate(['/fields']).then();
  }
}
