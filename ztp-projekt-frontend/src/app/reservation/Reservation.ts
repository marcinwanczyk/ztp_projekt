
export interface Reservation {
  id: number;
  userId: number;
  fieldId: number;
  fieldType: string;
  fieldNo: number;
  date: string; // Use string to represent LocalDate
  time: number;
}
