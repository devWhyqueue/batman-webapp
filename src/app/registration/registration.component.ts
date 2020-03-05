import {Component, OnInit} from '@angular/core';
import {IRegistration} from '../shared/model/registration.model';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as XRegExp from 'xregexp';
import {UserService} from '../core/auth/user.service';
import {IUser} from '../core/user/user.model';
import {DisciplineType} from '../shared/model/discipline.enum';
import {Gender} from '../core/user/gender.enum';
import {FieldType} from '../shared/model/field.enum';
import {ToastrService} from 'ngx-toastr';
import {RegistrationWithPartner} from '../shared/model/registration-with-partner.model';
import {RegistrationService} from '../shared/service/registration.service';
import {DivisionService} from './division.service';
import {IDivision} from '../shared/model/division.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  Gender = Gender;

  user: IUser;

  private registrations: IRegistration[];

  showSingleRegistration = false;
  showDoubleRegistration = false;
  showMixedRegistration = false;

  singleDivisions = [];
  doubleDivisions = [];
  mixedDivisions = [];

  singleForm = this.fb.group({
    division: [null, [Validators.required]]
  });
  doubleForm = this.fb.group({
    division: [null, [Validators.required]],
    first: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    gender: [{value: null, disabled: true}, [Validators.required]],
    club: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]]
  });
  mixedForm = this.fb.group({
    division: [null, [Validators.required]],
    first: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    gender: [{value: null, disabled: true}, [Validators.required]],
    club: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]]
  });

  constructor(private registrationService: RegistrationService, private divisionService: DivisionService,
              private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.userService.identity().subscribe(user => {
      this.user = user;
      this.doubleForm.get(['gender']).setValue(Gender[user.gender]);
      const mixedGender = user.gender === Gender[String(Gender.MALE)] ? Gender.FEMALE : Gender.MALE;
      this.mixedForm.get(['gender']).setValue(mixedGender);

      const fieldType = user.gender === Gender[String(Gender.MALE)] ? FieldType.MALE : FieldType.FEMALE;
      this.divisionService
        .findByDisciplineTypeAndFieldType(DisciplineType.SINGLE, fieldType)
        .subscribe((res: HttpResponse<IDivision[]>) => {
          this.singleDivisions = (res.body || []);
          this.singleForm.get(['division']).setValue((res.body[0] || null));
        });
      this.divisionService
        .findByDisciplineTypeAndFieldType(DisciplineType.DOUBLE, fieldType)
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


      this.registrationService
        .getOwnCurrentRegistrations()
        .subscribe((res: HttpResponse<IRegistration[]>) => {
          this.registrations = (res.body || []);
          this.showSingleRegistration = !this.isRegisteredForDisciplineType(DisciplineType.SINGLE);
          this.showDoubleRegistration = !this.isRegisteredForDisciplineType(DisciplineType.DOUBLE);
          this.showMixedRegistration = !this.isRegisteredForDisciplineType(DisciplineType.MIXED);
        });
    });
  }

  private isRegisteredForDisciplineType(disciplineType: DisciplineType): boolean {
    return this.registrations
      .filter(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(disciplineType)])
      .length > 0;
  }

  registerForSingle() {
    const division = this.singleForm.get(['division']).value;
    this.registrationService.registerForSingle(division).subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  registerForDouble() {
    const division = this.doubleForm.get(['division']).value;
    const firstName = this.doubleForm.get(['first']).value;
    const lastName = this.doubleForm.get(['last']).value;
    const gender = this.doubleForm.get(['gender']).value;
    const club = this.doubleForm.get(['club']).value;
    this.registrationService.registerForDouble(
      new RegistrationWithPartner({firstName, lastName, gender, club}, division)).subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  registerForMixed() {
    const division = this.mixedForm.get(['division']).value;
    const firstName = this.mixedForm.get(['first']).value;
    const lastName = this.mixedForm.get(['last']).value;
    const gender = this.mixedForm.get(['gender']).value;
    const club = this.mixedForm.get(['club']).value;
    this.registrationService.registerForMixed(
      new RegistrationWithPartner({firstName, lastName, gender, club}, division)).subscribe(
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
}
