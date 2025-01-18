import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsComponent } from './fields.component';
import {CardModule} from "primeng/card";
import {DialogService} from "primeng/dynamicdialog";
import {FieldsService} from "./fields.service";
import {SearchService} from "../layout/topbar/search.service";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {of} from "rxjs";
import {Field} from "./Field";
import {ToastModule} from "primeng/toast";
import {Component} from "@angular/core";

describe('FieldsComponent', () => {
  let component: FieldsComponent;
  let fixture: ComponentFixture<FieldsComponent>;
  let fieldsService: jasmine.SpyObj<FieldsService>;
  let searchService: jasmine.SpyObj<SearchService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    const fieldsServiceSpy = jasmine.createSpyObj('FieldsService', ['getFields']);
    const searchServiceSpy = jasmine.createSpyObj('SearchService', ['search$']);
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);

    await TestBed.configureTestingModule({
      imports: [FieldsComponent, CardModule, CommonModule, ButtonModule, DividerModule, ToastModule, ],
      providers: [
        { provide: FieldsService, useValue: fieldsServiceSpy },
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldsComponent);
    component = fixture.componentInstance;
    fieldsService = TestBed.inject(FieldsService) as jasmine.SpyObj<FieldsService>;
    searchService = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;

    fieldsService.getFields.and.returnValue(Promise.resolve([]));
    searchService.search$ = of('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields on init', async () => {
    const mockFields: Field[] = [{ id: 1, type: 'Type1', field_no: 1 }];
    fieldsService.getFields.and.returnValue(Promise.resolve(mockFields));

    await component.ngOnInit();

    expect(component.fields).toEqual(mockFields);
    expect(component.filteredFields).toEqual(mockFields);
  });

  it('should filter fields based on search term', () => {
    component.fields = [
      { id: 1, type: 'Type1', field_no: 1 },
      { id: 2, type: 'Type2', field_no: 2 }
    ];

    component.searchTerm = 'Type1';
    component.filterFields();

    expect(component.filteredFields).toEqual([{ id: 1, type: 'Type1', field_no: 1 }]);
  });

  it('should open dialog with field details', () => {
    const mockField: Field = { id: 1, type: 'Type1', field_no: 1 };
    component.showReservation(mockField);

    expect(dialogService.open).toHaveBeenCalledWith(jasmine.any(Function),{
      header: 'Type1 1',
      data: { id: 1 },
      width: '1000px',
      height: '550px',
      contentStyle: { 'align-items': 'center', 'display': 'flex', 'justify-content': 'center' }
    });
  });
});
