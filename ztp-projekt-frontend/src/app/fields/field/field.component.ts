import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {FieldWithReservations} from "../Field";
import {FieldsService} from "../fields.service";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";
import {ReservationsService} from "../../reservation/reservations.service";
import {UiHelperService} from "../../ui-helper.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    JsonPipe,
    TableModule,
    CommonModule,
    PanelModule,
    ConfirmDialogModule
  ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  providers: [ConfirmationService]
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
              public fieldsService: FieldsService,
              private reservationService: ReservationsService,
              private uiHelper: UiHelperService,
              private confirmationService: ConfirmationService
  ) {
    this.id = config.data.id
    const today = new Date();
    this.minDate = new Date();
    this.maxDate = new Date(today.setDate(today.getDate() + 7));
       this.resetFieldReservations();
  }

  private resetFieldReservations() {
    if(this.id) {
      this.fieldsService.getFieldWithReservations(this.id).then((data) => {
        this.fieldWithReservations = data;
        this.setTimeSlots()
      });
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

  reserveField(time: number) {
    this.confirmationService.confirm({
      message: `Czy chcesz zarezerwować obiekt ${this.fieldWithReservations?.field.type} ${this.fieldWithReservations?.field.field_no} w terminie ${this.date?.toISOString().slice(0, 10)} ${time}:00?`,
      header: 'Potwierdzenie rezerwacji',
      acceptButtonStyleClass: 'p-button-success',
      acceptLabel: 'Tak',
      acceptIcon: 'pi pi-check',
      rejectButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Nie',
      rejectIcon: 'pi pi-times',
      accept: () => {
        if(this.id && this.date) {
          this.reservationService.reserveField(this.id, this.date.toISOString().slice(0, 10), time).then(() => {
            this.uiHelper.showMessageOperationSuccesful("Zarezerwowano pomyślnie");
            this.resetFieldReservations()
          })
      }}
    })

  }
}
