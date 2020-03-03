import {Gender} from '../../core/user/gender.enum';


export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  club?: string;
}

export class Player implements IPlayer {

  constructor(public id?: number, public firstName?: string, public lastName?: string, public gender?: Gender, public club?: string) {
  }
}
