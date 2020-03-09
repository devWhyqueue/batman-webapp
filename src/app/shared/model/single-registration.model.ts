import {IPlayer} from './player.model';
import {IDivision} from './division.model';

export interface ISingleRegistration {
  division?: IDivision;
  player?: IPlayer;
}

export class SingleRegistration implements ISingleRegistration {

  constructor(public division?: IDivision, public player?: IPlayer) {
  }
}
