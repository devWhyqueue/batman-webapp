import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../shared/service/registration.service';
import {IRegistration} from '../shared/model/registration.model';
import {HttpResponse} from '@angular/common/http';
import {DisciplineType} from '../shared/model/discipline.enum';
import {TableService} from '../shared/table/table.service';
import {RegistrationFilter} from '../shared/service/registration.filter';
import {Gender} from '../core/user/gender.enum';

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

  private registrations: IRegistration[];
  private registrationFilter: RegistrationFilter;

  constructor(private registrationService: RegistrationService, private tableService: TableService) {
  }

  ngOnInit() {
    this.registrationService
    .getOwnCurrentRegistrations()
    .subscribe((res: HttpResponse<IRegistration[]>) => {
      this.registrations = (res.body || []);
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
    console.log(this.singleRegistered);
  }

  private doubleFilter(): void {
    this.doubleRegistered = this.tableService.initItems(
      this.registrationFilter.starting(DisciplineType.DOUBLE),
      [['player.firstName', 'player.lastName'], ['partner.firstName', 'partner.lastName'], ['state']]);
  }

  private mixedFilter(): void {
    const mixedStartingRegs = this.registrationFilter.starting(DisciplineType.MIXED);
    this.switchPlayerAndPartner(mixedStartingRegs);
    this.mixedRegistered = this.tableService.initItems(mixedStartingRegs,
      [['player.firstName', 'player.lastName'], ['partner.firstName', 'partner.lastName'], ['state']]);
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
