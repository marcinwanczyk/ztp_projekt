import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, Subscription} from "rxjs";
// import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Button, ButtonDirective} from "primeng/button";
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
import {TableModule} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
    ButtonDirective,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy{
  private subs: Subscription[] = [];

  showSearchBar: boolean = true;
  searchFields: string = '';
  username: string | null = null;
  reservations: Reservation[] = []

  constructor(
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService,
    private uiHelper: UiHelperService,
    private reservationService: ReservationsService,
    private confirmationService: ConfirmationService
  ) {
    this.subs.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe((event) => {
        this.searchFields = '';
      }),
      this.authService.getAuth().subscribe((auth) => {
        this.username = auth.username;
      })
    )

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
    this.router.navigate(['/']).then();
  }

  onOverlayToggle() {
    this.reservationService.getReservationsForUser().then((reservations) => {
      this.refreshReservations();
    });
  }

  deleteReservation(id: number) {
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz usunąć tę rezerwację?',
      header: 'Potwierdzenie usunięcia',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Tak',
      acceptIcon: 'pi pi-check',
      rejectButtonStyleClass: 'p-button-secondary',
      rejectLabel: 'Nie',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.reservationService.deleteReservation(id).then(() => {
          this.uiHelper.showMessageOperationSuccesful('Rezerwacja została usunięta');
          this.refreshReservations();
        });
      }
    });
  }

  private refreshReservations() {
    this.reservationService.getReservationsForUser().then((reservations) => {
      this.reservations = reservations.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateA === dateB) {
          return a.time - b.time;
        }
        return dateA - dateB;
      });
    });
  }
}
