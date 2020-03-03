import {Component, OnInit} from '@angular/core';
import {IStep, Step} from '../shared/model/step.model';
import {RegistrationService} from '../shared/service/registration.service';
import {IRegistration} from '../shared/model/registration.model';
import {HttpResponse} from '@angular/common/http';
import {RegistrationFilter} from '../participants/registration.filter';
import {State} from '../shared/model/state.enum';
import {DisciplineType} from '../shared/model/discipline.enum';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  private registrations: IRegistration[];

  singleSteps = [];
  doubleSteps = [];
  mixedSteps = [];

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.registrationService
      .getOwnCurrentRegistrations()
      .subscribe((res: HttpResponse<IRegistration[]>) => {
        this.registrations = (res.body || []);
        this.initSingleSteps();
        this.initDoubleSteps();
        this.initMixedSteps();
      });
  }

  private initSingleSteps(): void {
    const singleRegistration = this.registrations
      .find(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(DisciplineType.SINGLE)]);
    this.singleSteps = singleRegistration ?
      Step.toSteps(State[String(singleRegistration.state)], singleRegistration.tournamentDiscipline) : [];
  }

  private initDoubleSteps(): void {
    const doubleRegistration = this.registrations
      .find(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(DisciplineType.DOUBLE)]);
    this.doubleSteps = doubleRegistration
      ? Step.toSteps(State[String(doubleRegistration.state)], doubleRegistration.tournamentDiscipline) : [];
  }

  private initMixedSteps(): void {
    const mixedRegistration = this.registrations
      .find(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(DisciplineType.MIXED)]);
    this.mixedSteps = mixedRegistration
      ? Step.toSteps(State[String(mixedRegistration.state)], mixedRegistration.tournamentDiscipline) : [];
  }

}
