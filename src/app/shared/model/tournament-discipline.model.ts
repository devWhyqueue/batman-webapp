import {ITournament} from './tournament.model';
import {IDiscipline} from './discipline.model';

export interface ITournamentDiscipline {
  id?: number;
  capacity?: number;
  registrationFee?: number;
  tournament?: ITournament;
  discipline?: IDiscipline;
}

export class TournamentDiscipline implements ITournamentDiscipline {

  constructor(public id?: number, public capacity?: number,
              public registrationFee?: number, public tournament?: ITournament, public discipline?: IDiscipline) {
  }
}

