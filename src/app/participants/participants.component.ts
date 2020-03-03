import {Component, OnInit} from '@angular/core';
import {RegistrationService} from './registration.service';
import {DisciplineType} from '../shared/model/discipline.enum';
import {HttpResponse} from '@angular/common/http';
import {IRegistration} from '../shared/model/registration.model';
import {TableService} from '../shared/table/table.service';
import {FormBuilder} from '@angular/forms';
import {FieldType} from '../shared/model/field.enum';
import {RegistrationFilter} from './registration.filter';


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  FieldType = FieldType;

  private registrations: IRegistration[];
  private registrationFilter: RegistrationFilter;

  singleHeaders = ['Vorname', 'Nachname', 'Verein'];
  singleDivisions = [];
  singleStarting = [];
  singleWaiting = [];

  doubleHeaders = ['Spieler', 'Verein', 'Partner', 'Verein'];
  doubleDivisions = [];
  doubleStarting = [];
  doubleWaiting = [];

  mixedHeaders = ['Spieler', 'Verein', 'Partnerin', 'Verein'];
  mixedDivisions = [];
  mixedStarting = [];
  mixedWaiting = [];

  singleForm = this.fb.group({
    divisionName: [undefined],
    fieldType: [FieldType.MALE],
  });
  doubleForm = this.fb.group({
    divisionName: [undefined],
    fieldType: [FieldType.MALE],
  });
  mixedForm = this.fb.group({
    divisionName: [undefined],
  });

  constructor(private registrationService: RegistrationService, private tableService: TableService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registrationService
    .getCurrentRegistrations()
    .subscribe((res: HttpResponse<IRegistration[]>) => {
      this.registrations = (res.body || []);
      this.registrationFilter = new RegistrationFilter(this.registrations);
      this.singleFilter();
      this.doubleFilter();
      this.mixedFilter();
    });
  }

  singleFilter() {
    this.singleDivisions = this.registrationFilter.divisions(DisciplineType.SINGLE, this.singleForm.get(['fieldType']).value);
    if (!this.singleForm.get(['divisionName']).value && this.singleDivisions.length) {
      this.singleForm.get(['divisionName']).setValue(this.singleDivisions[0]);
    }
    this.singleStarting = this.tableService.initItems(
      this.registrationFilter.starting(DisciplineType.SINGLE,
        this.singleForm.get(['divisionName']).value, this.singleForm.get(['fieldType']).value),
      [['player.firstName'], ['player.lastName'], ['player.club']]);
    this.singleWaiting = this.tableService.initItems(
      this.registrationFilter.waiting(DisciplineType.SINGLE,
        this.singleForm.get(['divisionName']).value, this.singleForm.get(['fieldType']).value),
      [['player.firstName'], ['player.lastName'], ['player.club']]);
  }

  resetSingleDivisionName() {
    this.singleForm.get(['divisionName']).setValue(undefined);
  }

  doubleFilter() {
    this.doubleDivisions = this.registrationFilter.divisions(DisciplineType.DOUBLE, this.doubleForm.get(['fieldType']).value);
    if (!this.doubleForm.get(['divisionName']).value && this.doubleDivisions.length) {
      this.doubleForm.get(['divisionName']).setValue(this.doubleDivisions[0]);
    }
    this.doubleStarting = this.tableService.initItems(
      this.registrationFilter.starting(DisciplineType.DOUBLE,
        this.doubleForm.get(['divisionName']).value, this.doubleForm.get(['fieldType']).value),
      [['player.firstName', 'player.lastName'], ['player.club'], ['partner.firstName', 'partner.lastName'], ['partner.club']]);
    this.doubleWaiting = this.tableService.initItems(
      this.registrationFilter.waiting(DisciplineType.DOUBLE,
        this.doubleForm.get(['divisionName']).value, this.doubleForm.get(['fieldType']).value),
      [['player.firstName', 'player.lastName'], ['player.club'], ['partner.firstName', 'partner.lastName'], ['partner.club']]);
  }

  resetDoubleDivisionName() {
    this.doubleForm.get(['divisionName']).setValue(undefined);
  }

  mixedFilter() {
    this.mixedDivisions = this.registrationFilter.divisions(DisciplineType.MIXED, FieldType.MIXED);
    if (!this.mixedForm.get(['divisionName']).value && this.mixedDivisions.length) {
      this.mixedForm.get(['divisionName']).setValue(this.mixedDivisions[0]);
    }
    this.mixedStarting = this.tableService.initItems(
      this.registrationFilter.starting(DisciplineType.MIXED,
        this.mixedForm.get(['divisionName']).value, FieldType.MIXED),
      [['player.firstName', 'player.lastName'], ['player.club'], ['partner.firstName', 'partner.lastName'], ['partner.club']]);
    this.mixedWaiting = this.tableService.initItems(
      this.registrationFilter.waiting(DisciplineType.MIXED,
        this.mixedForm.get(['divisionName']).value, FieldType.MIXED),
      [['player.firstName', 'player.lastName'], ['player.club'], ['partner.firstName', 'partner.lastName'], ['partner.club']]);
  }
}
