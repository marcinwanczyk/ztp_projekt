import {Field} from "../fields/Field";

export interface Reservation {
  id: number;
  field: Field;
  reservationDate: string;
  reservationTime: number;
  userId: number;
}
