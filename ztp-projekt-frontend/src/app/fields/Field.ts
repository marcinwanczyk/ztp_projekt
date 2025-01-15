export interface Field {
  id: number;
  type: string;
  field_no: number;
}

export interface FieldWithReservations {
  field: Field;
  reservations: { [date: string]: number[] };
}
