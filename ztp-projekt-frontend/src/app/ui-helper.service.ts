import { Injectable } from '@angular/core';
import {MessageService, PrimeIcons} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {

  constructor(
    private messageService: MessageService
  ) { }

  async handleError(reason: any, message?: string) {
    let msg = '';
    let errorCode = '';
    if ((reason instanceof HttpErrorResponse) && !message) {
      if( reason.status == 0 ){
        msg = "Wystąpił błąd w komunikacji z serwerem"
      }else if( reason.status == 401 ) {
        msg = "Wystąpił błąd autoryzacji"
      } else if( reason.status >= 400 && reason.status < 500 ) {
        msg =  "Wystąpił błąd - niepoprawne żądanie"
      } else if( reason.status >= 500 && reason.status < 600 ) {
        msg = "Wystąpił nieprzewidziany błąd serwera"
      } else {
        msg = "Wystąpił nieprzewidziany błąd aplikacji"
      }
    } else if(message){
      msg = message;
    }

    this.messageService.add({ icon: PrimeIcons.EXCLAMATION_TRIANGLE, severity: 'error', detail: msg })
  }

  showMessageOperationSuccesful(message?: string){
    let msg
    if(!message)
      msg = "Operacja zakończona sukcesem";
    else
      msg = message;

    this.messageService.add({
      icon: PrimeIcons.CHECK,
      severity: 'success',
      detail: msg
    })
  }
}

