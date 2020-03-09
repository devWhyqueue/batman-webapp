import {IPlayer} from './player.model';
import {IDivision} from './division.model';

export interface IRegistrationWithPartner {
  division?: IDivision;
  player?: IPlayer;
  partner?: IPlayer;
}

export class RegistrationWithPartner implements IRegistrationWithPartner{

  constructor(public division?: IDivision, public player?: IPlayer, public partner?: IPlayer) {
  }
}
