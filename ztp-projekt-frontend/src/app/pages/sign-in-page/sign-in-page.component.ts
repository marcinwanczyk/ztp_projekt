import {Component} from '@angular/core';
// import {UsersService} from "../../users/users.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
// import {UserDto} from "../../users/model/UserDto";
import {Router} from "@angular/router";
// import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  signForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose(
      [Validators.email, Validators.required]
    )),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  });

  constructor(
    // private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService
  ) {
  }

  handleSignInButton() {
     // let newUser: UserDto = {
     //   email: this.signForm.controls['email'].value,
     //   password: this.signForm.controls['password'].value,
     //   name: this.signForm.controls['name'].value,
     //   surname: this.signForm.controls['surname'].value
     // }
      // this.userService.registerNewUser(newUser)
      //   .then(() => {
      //     this.authService.login(this.signForm.controls['email'].value, this.signForm.controls['password'].value)
      //       .then(()=>{
      //         this.router.navigate(['/']).then()
      //       });
      //   })
  }
}
