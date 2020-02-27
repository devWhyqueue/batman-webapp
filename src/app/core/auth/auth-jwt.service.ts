import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

import {JWT} from './JWT';
import {environment} from '../../../environments/environment';
import {Login} from '../login/login.model';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {
  private authServerUrl = environment.authServer;

  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
  }

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
    .post<JWT>(this.authServerUrl + 'authenticate', credentials)
    .pipe(map(response => this.authenticateSuccess(response, false)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JWT, rememberMe: boolean): void {
    const jwt = response.token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }
}
