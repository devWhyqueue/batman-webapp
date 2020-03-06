import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ActivateService {

  private authServerUrl = environment.authServer;

  constructor(private http: HttpClient) {
  }

  activateUser(key: string): Observable<{}> {
    return this.http.get(this.authServerUrl + 'users/activate', {
      params: new HttpParams().set('key', key)
    });
  }
}
