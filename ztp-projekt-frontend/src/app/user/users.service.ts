import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../config/config.service";
import {User} from "./User";
import {UserDto} from "./UserDto";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  registerNewUser(user: UserDto): Promise<User>{

    let url = this.configService.getApiUrl("REGISTER_USER");

    return new Promise<User>((resolve, reject) =>{
      this.http.post<User>(url, user)
        .subscribe({
          next: (user: User) =>{
            resolve(user);
          },
          error: (err) =>{
            reject(err);
          }
        })
    })
  }

}
