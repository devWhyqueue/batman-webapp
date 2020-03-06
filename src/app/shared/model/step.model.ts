import {State} from './state.enum';
import {StateInfo} from './state-info';
import {ITournamentDiscipline} from './tournament-discipline.model';

export interface IStep {
  title?: string;
  description?: string;
  active?: boolean;
  completed?: boolean;
}

export class Step implements IStep {
  constructor(public title?: string, public description?: string, public active?: boolean, public completed?: boolean) {
  }

  static toSteps(state: State, tournamentDiscipline: ITournamentDiscipline, mobile: boolean): IStep[] {
    const steps = [];
    let activeStateReached = false;
    for (const s in State) {
      if (!isNaN(Number(s))) {
        const step = new Step(StateInfo.getTitle(Number(s)), null, false, false);
        if (Number(s) === state) {
          step.active = true;
          step.description = StateInfo.getDescription(Number(s), tournamentDiscipline);
          activeStateReached = true;
        } else if (!activeStateReached) {
          step.completed = true;
        }
        if (!mobile || (mobile && step.active)) {
          steps.push(step);
        }
      }
    }
    if (mobile) {
      return steps;
    } else {
      return [State.WAITING, State.PAYMENT_PENDING, State.CONFIRMED].includes(state) ?
        steps.slice(0, 3) : steps.slice(3, 5);
    }
  }
}
