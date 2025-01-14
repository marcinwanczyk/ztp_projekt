import {Component} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {UserDto} from "../../user/UserDto";
import {UsersService} from "../../user/users.service";
import {AuthService} from "../../auth/auth.service";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule],
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  signForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose(
      [Validators.email, Validators.required]
    )),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  });

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  handleSignInButton() {
     let newUser: UserDto = {
       email: this.signForm.controls['email'].value,
       password: this.signForm.controls['password'].value,
       username: this.signForm.controls['username'].value,

     }
      this.userService.registerNewUser(newUser)
        .then(() => {
          this.authService.login(this.signForm.controls['email'].value, this.signForm.controls['password'].value)
            .then(()=>{
              this.router.navigate(['/']).then()
            });
        })
  }
}
