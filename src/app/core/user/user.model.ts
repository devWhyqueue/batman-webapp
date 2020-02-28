import {Gender} from './gender.enum';
import {Authority} from './authority.model';

export interface IUser {
  id?: any;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  club?: string;
  email?: string;
  password?: string;
  authorities?: Authority[];
}

export class User implements IUser {
  constructor(
    public id?: any,
    public firstName?: string,
    public lastName?: string,
    public gender?: Gender,
    public club?: string,
    public email?: string,
    public password?: string,
    public authorities?: Authority[]
  ) {
  }
}
