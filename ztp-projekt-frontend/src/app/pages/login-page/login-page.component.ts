import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {ConfigService} from "../../config/config.service";
import {Router} from "@angular/router";
// import {AuthService} from "../../auth/auth.service";
import {async, Subscription} from "rxjs";
import {UiHelperService} from "../../ui-helper.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy{

  login?: string;
  password?: string

  subs: Subscription[] = [];

  submitted = false;

  constructor(
    // private authService: AuthService,
    private router: Router,
    private uiHelper: UiHelperService
  ) {
  }

  ngOnInit() {
    this.uiHelper.handleError("cos", "Wprowadzono błędny email lub hasło");

    this.subs.push(
      // this.authService.getAuth().subscribe((authDetails) =>{
      //   if(authDetails.isLoggedIn){
      //     this.router.navigate(["/"]).then();
      //   }
      // })
    )
  }

  onSubmit() {
    this.submitted = true;
    // if(this.login && this.password)
    //   this.authService.login(this.login, this.password).then(
    //     async (authDetails) =>{
    //       if(authDetails?.isLoggedIn) {
    //         this.router.navigate(["/"]).then()
    //       }
    //     }
    //   ).catch( (reason) => {
    //       this.uiHelper.handleError(reason, "Wprowadzono błędny email lub hasło");
    //   })
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      try{
        sub.unsubscribe();
      }catch (e){
        // ignore
      }
    })
  }

  handleSingUpButton() {
    this.router.navigate(['/sign-in-page']).then()
  }
}
