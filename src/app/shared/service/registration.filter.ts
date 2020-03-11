import {IRegistration} from '../model/registration.model';
import {DisciplineType} from '../model/discipline.enum';
import {FieldType} from '../model/field.enum';
import {State} from '../model/state.enum';

export class RegistrationFilter {

  private registrations: IRegistration[];

  constructor(registrations: IRegistration[]) {
    this.registrations = registrations;
  }

  divisions(disciplineType: DisciplineType, fieldType: FieldType): string[] {
    return [...new Set(
      this.registrations
      .filter(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(disciplineType)])
      .filter(r => r.tournamentDiscipline.discipline.fieldType === FieldType[String(fieldType)])
      .filter(r => ![State.REFUND_PENDING, State.CANCELLED].includes(State[String(r.state)]))
      .map(r => r.tournamentDiscipline.discipline.division.name)
      .sort((a, b) => a.localeCompare(b))
    )];
  }

  starting(disciplineType: DisciplineType, fieldType?: FieldType, divisionName?: string): IRegistration[] {
    let registrations = this.registrations
    .filter(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(disciplineType)])
    .filter(r => [State.PAYMENT_PENDING, State.CONFIRMED].includes(State[String(r.state)]));

    if (fieldType) {
      registrations = registrations.filter(r => r.tournamentDiscipline.discipline.fieldType === FieldType[String(fieldType)]);
    }
    if (divisionName) {
      registrations = registrations.filter(r => r.tournamentDiscipline.discipline.division.name === divisionName);
    }
    return registrations;
  }

  waiting(disciplineType: DisciplineType, divisionName: string, fieldType: FieldType): IRegistration[] {
    return this.registrations
    .filter(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(disciplineType)])
    .filter(r => State[String(r.state)] === State.WAITING)
    .filter(r => r.tournamentDiscipline.discipline.division.name === divisionName)
    .filter(r => r.tournamentDiscipline.discipline.fieldType === FieldType[String(fieldType)]);
  }
}
