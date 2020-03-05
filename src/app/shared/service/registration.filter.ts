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
      .map(r => r.tournamentDiscipline.discipline.division.name)
      .sort((a, b) => a.localeCompare(b))
    )];
  }

  starting(disciplineType: DisciplineType, divisionName: string, fieldType: FieldType): IRegistration[] {
    return this.registrations
    .filter(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(disciplineType)])
    .filter(r => [State.PAYMENT_PENDING, State.CONFIRMED].includes(State[String(r.state)]))
    .filter(r => r.tournamentDiscipline.discipline.division.name === divisionName)
    .filter(r => r.tournamentDiscipline.discipline.fieldType === FieldType[String(fieldType)]);
  }

  waiting(disciplineType: DisciplineType, divisionName: string, fieldType: FieldType): IRegistration[] {
    return this.registrations
    .filter(r => r.tournamentDiscipline.discipline.disciplineType === DisciplineType[String(disciplineType)])
    .filter(r => State[String(r.state)] === State.WAITING)
    .filter(r => r.tournamentDiscipline.discipline.division.name === divisionName)
    .filter(r => r.tournamentDiscipline.discipline.fieldType === FieldType[String(fieldType)]);
  }
}
