import {Component, ElementRef, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  private subs: Subscription[] = [];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  handleLogoutClick(){
    this.authService.logout().then()
  }

  handleUsersClick() {
    this.router.navigate(['/users']).then()
  }

  handleMeetingsClick() {
    this.router.navigate(['/meetings']).then()

  }
}
