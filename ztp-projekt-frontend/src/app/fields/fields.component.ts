import {Component, OnInit} from '@angular/core';
import {Field} from "./Field";
import {FieldsService} from "./fields.service";
import {CardModule} from "primeng/card";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {SearchService} from "../layout/topbar/search.service";
import {DividerModule} from "primeng/divider";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FieldComponent} from "./field/field.component";

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ButtonModule,
    DividerModule
  ],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.scss',
  providers: [DialogService]
})
export class FieldsComponent implements OnInit {
  fields: Field[] = [];
  searchTerm: string = '';
  filteredFields: Field[] = [];

  dialogRef?: DynamicDialogRef;
  constructor(
    private fieldsService: FieldsService,
    private searchService: SearchService,
    private dialogService: DialogService
  ) {
  }

  async ngOnInit() {
    this.fields = await this.fieldsService.getFields();
    this.filteredFields = this.fields;
    this.searchService.search$.subscribe(term => {
      this.searchTerm = term;
      this.filterFields();
    });
  }

  filterFields() {
    if (this.searchTerm) {
      this.filteredFields = this.fields.filter(field =>
        (field.type.toLowerCase() + ` ${field.field_no}`).includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFields = this.fields;
    }
  }

  showReservation(field: Field) {
    this.dialogRef = this.dialogService.open(FieldComponent,
      {
        header: field.type + " " + field.field_no,
        data: { id: field.id },
        width: "1000px",
        height: "550px",
        contentStyle: {"align-items": "center", "display": "flex", "justify-content": "center"}
      }
    )

  }
}


