import {DisciplineType} from './discipline.enum';
import {FieldType} from './field.enum';
import {IDivision} from './division.model';

export interface IDiscipline {
  id?: number;
  disciplineType?: DisciplineType;
  fieldType?: FieldType;
  division?: IDivision;
}

export class Discipline implements IDiscipline {

  constructor(public id?: number, public disciplineType?: DisciplineType, public fieldType?: FieldType, public division?: IDivision) {
  }
}
