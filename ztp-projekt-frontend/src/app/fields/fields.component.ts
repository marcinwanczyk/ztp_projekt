import {Component, OnInit} from '@angular/core';
import {Field} from "./Field";
import {FieldsService} from "./fields.service";
import {CardModule} from "primeng/card";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {SearchService} from "../layout/topbar/search.service";
import {DividerModule} from "primeng/divider";

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
  styleUrl: './fields.component.scss'
})
export class FieldsComponent implements OnInit {

  fields: Field[] = [];
  searchTerm: string = '';
  filteredFields: Field[] = [];
  constructor(
    private fieldsService: FieldsService,
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.fields = this.fieldsService.getFields();
    this.filteredFields = this.fields;
    this.searchService.search$.subscribe(term => {
      this.searchTerm = term;
      this.filterFields();
    });
  }

  filterFields() {
    if (this.searchTerm) {
      this.filteredFields = this.fields.filter(field =>
        field.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFields = this.fields;
    }
  }
}


