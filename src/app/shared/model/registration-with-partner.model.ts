import {Player} from './player.model';
import {Division} from './division.model';

export interface IRegistrationWithPartner {
  partner?: Player;
  division?: Division;
}

export class RegistrationWithPartner implements IRegistrationWithPartner{

  constructor(public partner?: Player, public division?: Division) {
  }
}
