import {Component, OnInit} from '@angular/core';
import {IRegistration} from '../shared/model/registration.model';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RegistrationFilter} from '../participants/registration.filter';
import * as XRegExp from 'xregexp';
import {UserService} from '../core/auth/user.service';
import {IUser} from '../core/user/user.model';
import {DisciplineType} from '../shared/model/discipline.enum';
import {Gender} from '../core/user/gender.enum';
import {FieldType} from '../shared/model/field.enum';
import {ToastrService} from 'ngx-toastr';
import {Division} from '../shared/model/division.model';
import {RegistrationWithPartner} from '../shared/model/registration-with-partner.model';
import {Player} from '../shared/model/player.model';
import {RegistrationService} from '../shared/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  Gender = Gender;

  private user: IUser;

  private registrations: IRegistration[];
  private registrationFilter: RegistrationFilter;

  singleDivisions = [];
  doubleDivisions = [];
  mixedDivisions = [];

  singleForm = this.fb.group({
    divisionName: [undefined]
  });
  doubleForm = this.fb.group({
    divisionName: [undefined],
    first: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    gender: [{value: null, disabled: true}, [Validators.required]],
    club: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]]
  });
  mixedForm = this.fb.group({
    divisionName: [undefined],
    first: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    gender: [{value: null, disabled: true}, [Validators.required]],
    club: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]]
  });

  constructor(private registrationService: RegistrationService, private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.userService.identity().subscribe(user => {
      this.user = user;
      this.doubleForm.get(['gender']).setValue(Gender[user.gender]);
      this.mixedForm.get(['gender']).setValue(Gender[user.gender]);

      const fieldType = user.gender === Gender[String(Gender.MALE)] ? FieldType.MALE : FieldType.FEMALE;
      this.registrationService
      .getOwnCurrentRegistrations()
      .subscribe((res: HttpResponse<IRegistration[]>) => {
        this.registrations = (res.body || []);
        this.registrationFilter = new RegistrationFilter(this.registrations);
        this.singleDivisions = this.registrationFilter.divisions(DisciplineType.SINGLE, fieldType);
        this.doubleDivisions = this.registrationFilter.divisions(DisciplineType.DOUBLE, fieldType);
        this.mixedDivisions = this.registrationFilter.divisions(DisciplineType.MIXED, FieldType.MIXED);
      });
    });
  }

  registerForSingle() {
    const divisionName = this.singleForm.get(['divisionName']).value;
    this.registrationService.registerForSingle(new Division(divisionName)).subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  registerForDouble() {
    const divisionName = this.doubleForm.get(['divisionName']).value;
    const firstName = this.doubleForm.get(['first']).value;
    const lastName = this.doubleForm.get(['last']).value;
    const gender = this.doubleForm.get(['gender']).value;
    const club = this.doubleForm.get(['club']).value;
    this.registrationService.registerForDouble(
      new RegistrationWithPartner(new Player(firstName, lastName, gender, club), new Division(divisionName))).subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  registerForMixed() {
    const divisionName = this.doubleForm.get(['divisionName']).value;
    const firstName = this.doubleForm.get(['first']).value;
    const lastName = this.doubleForm.get(['last']).value;
    const gender = this.doubleForm.get(['gender']).value;
    const club = this.doubleForm.get(['club']).value;
    this.registrationService.registerForMixed(
      new RegistrationWithPartner(new Player(firstName, lastName, gender, club), new Division(divisionName))).subscribe(
      () => (this.success()),
      response => this.processError(response)
    );
  }

  private success() {
    this.toastrService.success('Du hast dich erfolgreich registriert.', 'Erfolgreich registriert');
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
      this.toastrService.error('Die gewählte Disziplin steht nicht zur Verfügung.', 'Turnier oder Turnierdisziplin nicht gefunden');
    } else if (response.status === 503) {
      this.toastrService.error('Die Benutzerdaten konnten nicht abgerufen werden.', 'Service nicht erreichbar');
    } else {
      this.toastrService.error('Bitte versuche es später erneut.', 'Registrierung fehlgeschlagen');
    }
  }

}
