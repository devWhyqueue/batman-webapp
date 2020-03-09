import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as XRegExp from 'xregexp';
import {DisciplineType} from '../shared/model/discipline.enum';
import {Gender} from '../core/user/gender.enum';
import {FieldType} from '../shared/model/field.enum';
import {ToastrService} from 'ngx-toastr';
import {RegistrationWithPartner} from '../shared/model/registration-with-partner.model';
import {RegistrationService} from '../shared/service/registration.service';
import {DivisionService} from './division.service';
import {IDivision} from '../shared/model/division.model';
import {SingleRegistration} from '../shared/model/single-registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  FieldType = FieldType;

  singleDivisions = [];
  doubleDivisions = [];
  mixedDivisions = [];

  singleForm = this.fb.group({
    fieldType: [FieldType.MALE],
    division: [null, [Validators.required]],
    first: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    club: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]]
  });
  doubleForm = this.fb.group({
    fieldType: [FieldType.MALE],
    division: [null, [Validators.required]],
    first1: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last1: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    club1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]],
    first2: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last2: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    club2: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]]
  });
  mixedForm = this.fb.group({
    division: [null, [Validators.required]],
    maleFirst: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    maleLast: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    maleClub: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]],
    femaleFirst: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    femaleLast: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    femaleClub: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]]
  });

  constructor(private registrationService: RegistrationService, private divisionService: DivisionService,
              private fb: FormBuilder, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.divisionService
    .findByDisciplineTypeAndFieldType(DisciplineType.SINGLE, this.singleForm.get(['fieldType']).value)
    .subscribe((res: HttpResponse<IDivision[]>) => {
      console.log(res.body);
      this.singleDivisions = (res.body || []);
      this.singleForm.get(['division']).setValue((res.body[0] || null));
    });
    this.divisionService
    .findByDisciplineTypeAndFieldType(DisciplineType.DOUBLE, this.doubleForm.get(['fieldType']).value)
    .subscribe((res: HttpResponse<IDivision[]>) => {
      this.doubleDivisions = (res.body || []);
      this.doubleForm.get(['division']).setValue((res.body[0] || null));
    });
    this.divisionService
    .findByDisciplineTypeAndFieldType(DisciplineType.MIXED, FieldType.MIXED)
    .subscribe((res: HttpResponse<IDivision[]>) => {
      this.mixedDivisions = (res.body || []);
      this.mixedForm.get(['division']).setValue((res.body[0] || null));
    });
  }

  resetDoubleDivisionName() {
    if (!this.doubleForm.get(['division']).value && this.doubleDivisions.length) {
      this.doubleForm.get(['division']).setValue(this.doubleDivisions[0]);
    }
  }

  resetSingleDivisionName() {
    if (!this.singleForm.get(['division']).value && this.singleDivisions.length) {
      this.singleForm.get(['division']).setValue(this.singleDivisions[0]);
    }
  }

  registerForSingle() {
    const gender = this.singleForm.get(['fieldType']).value === FieldType.MALE ? Gender.MALE : Gender.FEMALE;
    const division = this.singleForm.get(['division']).value;
    const firstName = this.singleForm.get(['first']).value;
    const lastName = this.singleForm.get(['last']).value;
    const club = this.singleForm.get(['club']).value;
    this.registrationService.registerForSingle(new SingleRegistration(division, {firstName, lastName, gender, club})).subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  registerForDouble() {
    const gender = this.doubleForm.get(['fieldType']).value === FieldType.MALE ? Gender.MALE : Gender.FEMALE;
    const division = this.doubleForm.get(['division']).value;
    const first1 = this.doubleForm.get(['first1']).value;
    const last1 = this.doubleForm.get(['last1']).value;
    const club1 = this.doubleForm.get(['club1']).value;
    const first2 = this.doubleForm.get(['first2']).value;
    const last2 = this.doubleForm.get(['last2']).value;
    const club2 = this.doubleForm.get(['club2']).value;
    this.registrationService.registerForDouble(
      new RegistrationWithPartner(division, {firstName: first1, lastName: last1, gender, club: club1},
        {firstName: first2, lastName: last2, gender, club: club2}))
    .subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  registerForMixed() {
    const division = this.mixedForm.get(['division']).value;
    const maleFirst = this.mixedForm.get(['maleFirst']).value;
    const maleLast = this.mixedForm.get(['maleLast']).value;
    const maleClub = this.mixedForm.get(['maleClub']).value;
    const femaleFirst = this.mixedForm.get(['femaleFirst']).value;
    const femaleLast = this.mixedForm.get(['femaleLast']).value;
    const femaleClub = this.mixedForm.get(['femaleClub']).value;
    this.registrationService.registerForMixed(
      new RegistrationWithPartner(division,
        {firstName: maleFirst, lastName: maleLast, gender: Gender.MALE, club: maleClub},
        {firstName: femaleFirst, lastName: femaleLast, gender: Gender.FEMALE, club: femaleClub}))
    .subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  private success() {
    this.toastrService.success('Klicke jetzt in der Navigationsleiste auf Status, um den Stand deiner Registrierung zu prüfen.',
      'Erfolgreich registriert');
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400) {
      switch (response.error.code) {
        case 'error.closeOfEntriesExceeded':
          this.toastrService.error('Der Anmeldezeitraum ist leider schon abgelaufen.', 'Anmeldezeitraum überschritten');
          break;
        case 'error.sameGender':
          this.toastrService.error('Mixed wird gemischt gespielt.', 'Spieler haben gleiches Geschlecht');
          break;
        case 'error.differentGender':
          this.toastrService.error('Partner müssen gleiches Geschlecht haben.', 'Spieler haben unterschiedliche Geschlechter');
          break;
      }
    } else if (response.status === 409) {
      this.toastrService.error('Du hast dich in diesem Jahr bereits registriert.', 'Bereits registriert');
    } else if (response.status === 404) {
      this.toastrService.error('Die gewählte Disziplin steht nicht zur Verfügung.',
        'Turnier oder Turnierdisziplin nicht gefunden');
    } else if (response.status === 503) {
      this.toastrService.error('Die Benutzerdaten konnten nicht abgerufen werden.', 'Service nicht erreichbar');
    } else {
      this.toastrService.error('Bitte versuche es später erneut.', 'Registrierung fehlgeschlagen');
    }
  }

  doubleFieldType() {
    return this.doubleForm.get(['fieldType']).value;
  }

  singleFieldType() {
    return this.singleForm.get(['fieldType']).value;
  }
}
