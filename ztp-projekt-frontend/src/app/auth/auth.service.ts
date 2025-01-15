import { Injectable } from '@angular/core';
import {AuthDetails} from "./model/auth-details";
import {BehaviorSubject, filter, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthDto} from "./model/auth-dto";
import {ConfigService} from "../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly ANONYMUS_AUTH_DETAILS
                  = new AuthDetails(false, null, null, null)

  private authChangeEventEmitter
                  = new BehaviorSubject<AuthDetails | null>(null);

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
  }

  public getAuth(): Observable<AuthDetails>{
    console.log("getAuth")
    // @ts-ignore
    return this.authChangeEventEmitter.asObservable().pipe(
      filter(value => value !== null)
    )
  }

  public getCurrentAuth(): AuthDetails|null{
    return this.authChangeEventEmitter.value;
  }

  public checkAuth(): Promise<AuthDetails>{
    return this.login(null,null);
  }

  public login(username: string | null, password: string | null){
    let httpHeaders = new HttpHeaders();

    if(username && password){
      httpHeaders = httpHeaders.append(
        "Authorization", "Basic " + btoa(`${username}:${password}`)
      );
    }

    let url = this.configService.getApiUrl("AUTH_LOGIN");

    return new Promise<AuthDetails>((resolve, reject) =>{
      this.http.get<AuthDto>(url,
        {
          headers: httpHeaders,
          withCredentials: true
        }).subscribe({
          next: (authDto: AuthDto) =>{
            const authDetails = new AuthDetails(true, authDto.userId, authDto.email, authDto.username);

            this.updateAuthEventEmitterValue(authDetails);
            resolve(authDetails)
          },
          error: (err) =>{
            if(err.error instanceof ErrorEvent){
              // this.logger.error('AuthService.login() ERROR: A client-side or network error occured: ', err, err.error.message);
              reject(err);
            }else {
              // this.logger.error('AuthService.login() ERROR: The backend returned an unsuccesful response code ' + err.status, err);
              if(err.status === 401 || err.status === 403){
                this.updateAuthEventEmitterValue(AuthService.ANONYMUS_AUTH_DETAILS);
                resolve(AuthService.ANONYMUS_AUTH_DETAILS);
              }

              reject(err);
            }
          }
      })
    })
  }

  public logout(): Promise<void>{
    return new Promise<void>((resolve, reject) =>{
      this.http.post<void>(
        this.configService.getApiUrl("AUTH_LOGOUT"),
        null,
        {withCredentials: true}
      ).subscribe({
        next: () => {
          window.location.reload();
          resolve()
        },error: (err) =>{
          if(err.status ===401){
            resolve()
          }
          reject(err);
        }
      })
    })
  }

  private updateAuthEventEmitterValue(auth: AuthDetails){
    if(JSON.stringify(auth) !== JSON.stringify(this.authChangeEventEmitter.value)){
      this.authChangeEventEmitter.next(auth);
    }
  }
}
