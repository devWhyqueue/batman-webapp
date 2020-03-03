import {State} from './state.enum';
import {IPlayer} from './player.model';
import {ITournamentDiscipline} from './tournament-discipline.model';

export interface IRegistration {
  id?: number;
  state?: State;
  registrationDate?: Date;
  player?: IPlayer;
  partner?: IPlayer;
  tournamentDiscipline?: ITournamentDiscipline;
}

export class Registration implements IRegistration {

  constructor(public id?: number, public state?: State, public registrationDate?: Date,
              public player?: IPlayer, public partner?: IPlayer, public tournamentDiscipline?: ITournamentDiscipline) {
  }
}
