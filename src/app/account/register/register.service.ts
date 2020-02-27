import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../core/user/user.model';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class RegisterService {
  private authServerUrl = environment.authServer;

  constructor(private http: HttpClient) {
  }

  save(user: IUser): Observable<{}> {
    return this.http.post(this.authServerUrl + 'users', user);
  }
}
