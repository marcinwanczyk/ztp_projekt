import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reservation} from "./Reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) {
  }

  reserveField(fieldId: number, date: string, time: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post<void>('http://localhost:8080/reservations',
        {
          fieldId: fieldId,
          reservationDate: date,
          reservationTime: time
        },
        {withCredentials: true})
        .subscribe({
          next: (res) => {
            resolve(res);
          }, error: (err) => {
            reject(err);
          }
        })
    })
  }

  getReservationsForUser(){
    return new Promise<Reservation[]>((resolve, reject) => {
      this.http.get<Reservation[]>('http://localhost:8080/reservations/user', {withCredentials: true})
        .subscribe({
          next: (res) => {
            resolve(res);
          }, error: (err) => {
            reject(err);
          }
        });
    });
  }

  deleteReservation(reservationId: number){
    return new Promise<void>((resolve, reject) => {
      this.http.delete<void>(`http://localhost:8080/reservations/${reservationId}`, {withCredentials: true})
        .subscribe({
          next: (res) => {
            resolve(res);
          }, error: (err) => {
            reject(err);
          }
        });
    });
  }
}
