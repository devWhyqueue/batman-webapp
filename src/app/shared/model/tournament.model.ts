export interface ITournament {
  id?: number;
  name?: string;
  start?: Date;
  end?: Date;
  closeOfEntries?: Date;
}

export class Tournament implements ITournament {

  constructor(public id?: number, public name?: string, public start?: Date, public end?: Date, public closeOfEntries?: Date) {
  }
}
