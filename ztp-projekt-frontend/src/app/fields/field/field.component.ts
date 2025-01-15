import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {FieldWithReservations} from "../Field";
import {FieldsService} from "../fields.service";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    JsonPipe,
    TableModule,
    CommonModule,
    PanelModule
  ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  id?: number;
  date: Date = new Date();
  minDate: Date;
  maxDate: Date;
  timeSlots: { [key: number]: boolean } = { 7: false,8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false };
  fieldWithReservations?: FieldWithReservations;
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public fieldsService: FieldsService
  ) {
    this.id = config.data.id
    const today = new Date();
    this.minDate = new Date();
    this.maxDate = new Date(today.setDate(today.getDate() + 7));
    if(this.id){
       this.fieldsService.getFieldWithReservations(this.id).then((data) =>{this.fieldWithReservations = data});
    }
  }

  checkButtonDisabled(time: number) {
    const dateKey = this.date?.toISOString().slice(0, 10);
    console.log("dateKey: ", dateKey);

    if (dateKey && this.fieldWithReservations && this.fieldWithReservations.reservations[dateKey]?.length > 0) {
      return this.fieldWithReservations.reservations[dateKey].includes(time);
    }else {
      return false;
    }
  }

  setTimeSlots() {
    const dateKey = this.date?.toLocaleDateString('en-CA');
    console.log("dateKey: ", dateKey);
    this.resetTimeSlots();

    if(!dateKey || !this.fieldWithReservations) return;
    if(this.fieldWithReservations.reservations && !this.fieldWithReservations.reservations[dateKey]) {
      console.log("tutaj")
      this.fieldWithReservations.reservations[dateKey] = [];
    }

    for (let key in this.timeSlots) {
      this.timeSlots[key] = this.fieldWithReservations.reservations[dateKey].includes(parseInt(key));
      console.log([key, this.timeSlots[key]]);
    }
  }

  resetTimeSlots() {
    for (let key in this.timeSlots) {
      this.timeSlots[key] = false;
    }
  }
}
