import { Injectable } from '@angular/core';
import {Field, FieldWithReservations} from "./Field";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getFields(): Promise<Field[]> {
    return new Promise<Field[]>((resolve, reject) => {
        this.http.get<Field[]>('http://localhost:8080/fields', {withCredentials: true}).subscribe({
          next: (fields: Field[]) => {
            resolve(fields);
          }, error: (err) => {
            reject(err);
          }
        })
      }
    )
  }

  getFieldWithReservations(id: number): Promise<FieldWithReservations> {
    return new Promise<FieldWithReservations>((resolve, reject) => {
      this.http.get<FieldWithReservations>(`http://localhost:8080/fields/${id}`, {withCredentials: true}).subscribe({
        next: (fieldWithReservations: FieldWithReservations) => {
          resolve(fieldWithReservations);
        }, error: (err) => {
          reject(err);
        }
      })
    })
  }
}
const fields: Field[] = [
  { id: 1, type: 'Basketball Court', field_no: 1 },
  { id: 2, type: 'Tennis Court', field_no: 2 },
  { id: 3, type: 'Soccer Field', field_no: 3 },
  { id: 4, type: 'Baseball Field', field_no: 4 },
  { id: 5, type: 'Swimming Pool', field_no: 5 },
  { id: 6, type: 'Volleyball Court', field_no: 6 },
  { id: 7, type: 'Running Track', field_no: 7 },
  { id: 8, type: 'Gymnasium', field_no: 8 },
  { id: 9, type: 'Hockey Rink', field_no: 9 },
  { id: 10, type: 'Golf Course', field_no: 10 }
];
