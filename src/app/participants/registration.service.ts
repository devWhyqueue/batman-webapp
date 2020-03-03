import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRegistration} from '../shared/model/registration.model';

@Injectable({providedIn: 'root'})
export class RegistrationService {
  private registrationServerUrl = environment.registrationServer;

  constructor(private http: HttpClient) {
  }

  getCurrentRegistrations(): Observable<HttpResponse<IRegistration[]>> {
    return this.http.get<IRegistration[]>(this.registrationServerUrl + 'tournament/current/registrations', { observe: 'response'});
  }
}
