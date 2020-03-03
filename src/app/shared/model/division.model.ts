export interface IDivision {
  name?: string;
}

export class Division implements IDivision {

  constructor(public name?: string) {
  }
}
