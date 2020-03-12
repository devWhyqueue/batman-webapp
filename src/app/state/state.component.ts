import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../shared/service/registration.service';
import {IRegistration} from '../shared/model/registration.model';
import {HttpResponse} from '@angular/common/http';
import {DisciplineType} from '../shared/model/discipline.enum';
import {TableService} from '../shared/table/table.service';
import {RegistrationFilter} from '../shared/service/registration.filter';
import {Gender} from '../core/user/gender.enum';
import {State} from '../shared/model/state.enum';
import {StateInfo} from '../shared/model/state-info';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  singleHeaders = ['Vorname', 'Nachname', 'Status'];
  singleRegistered = [];

  doubleHeaders = ['Spieler', 'Partner', 'Status'];
  doubleRegistered = [];

  mixedHeaders = ['Spieler', 'Partnerin', 'Status'];
  mixedRegistered = [];

  numOfRegistrations: number;
  registrationFeeSum = 0;
  private registrations: IRegistration[];
  private registrationFilter: RegistrationFilter;

  constructor(private registrationService: RegistrationService, private tableService: TableService) {
  }

  ngOnInit() {
    this.registrationService
    .getOwnCurrentRegistrations()
    .subscribe((res: HttpResponse<IRegistration[]>) => {
      this.registrations = (res.body || []);
      this.numOfRegistrations = this.registrations.length;
      this.registrations
      .filter(r => State.PAYMENT_PENDING === State[String(r.state)])
      .map(r => r.tournamentDiscipline.registrationFee)
      .forEach(f => this.registrationFeeSum += f);

      this.registrationFilter = new RegistrationFilter(this.registrations);
      this.singleFilter();
      this.doubleFilter();
      this.mixedFilter();
    });
  }

  private singleFilter(): void {
    this.singleRegistered = this.tableService.initItems(
      this.registrationFilter.starting(DisciplineType.SINGLE),
      [['player.firstName'], ['player.lastName'], ['state']]);
    this.tableService.replaceColumnValues(this.singleRegistered, 2, StateInfo.getTitle);
  }

  private doubleFilter(): void {
    this.doubleRegistered = this.tableService.initItems(
      this.registrationFilter.starting(DisciplineType.DOUBLE),
      [['player.firstName', 'player.lastName'], ['partner.firstName', 'partner.lastName'], ['state']]);
    this.tableService.replaceColumnValues(this.doubleRegistered, 2, StateInfo.getTitle);
  }

  private mixedFilter(): void {
    const mixedStartingRegs = this.registrationFilter.starting(DisciplineType.MIXED);
    this.switchPlayerAndPartner(mixedStartingRegs);
    this.mixedRegistered = this.tableService.initItems(mixedStartingRegs,
      [['player.firstName', 'player.lastName'], ['partner.firstName', 'partner.lastName'], ['state']]);
    this.tableService.replaceColumnValues(this.mixedRegistered, 2, StateInfo.getTitle);
  }

  private switchPlayerAndPartner(registrations: IRegistration[]): void {
    registrations.forEach(r => {
      if (Gender[String(r.player.gender)] === Gender.FEMALE) {
        const p = r.player;
        r.player = r.partner;
        r.partner = p;
      }
    });
  }
}
