import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDivision} from '../model/division.model';
import {IRegistrationWithPartner} from '../model/registration-with-partner.model';
import {environment} from '../../../environments/environment';
import {IRegistration} from '../model/registration.model';

@Injectable({providedIn: 'root'})
export class RegistrationService {
  private registrationServerUrl = environment.registrationServer;

  constructor(private http: HttpClient) {
  }

  getCurrentRegistrations(): Observable<HttpResponse<IRegistration[]>> {
    return this.http.get<IRegistration[]>(this.registrationServerUrl + 'tournaments/current/registrations', { observe: 'response'});
  }

  getOwnCurrentRegistrations(): Observable<HttpResponse<IRegistration[]>> {
    return this.http.get<IRegistration[]>(this.registrationServerUrl + 'tournaments/current/registrations/self', { observe: 'response'});
  }

  registerForSingle(division: IDivision): Observable<HttpResponse<IRegistration>> {
    return this.http.post<IRegistration>(this.registrationServerUrl + 'tournaments/current/registrations/self/disciplineType/SINGLE',
      division, {observe: 'response'});
  }

  registerForDouble(registrationWithPartner: IRegistrationWithPartner): Observable<HttpResponse<IRegistration>> {
    return this.http.post<IRegistration>(this.registrationServerUrl + 'tournaments/current/registrations/self/disciplineType/DOUBLE',
      registrationWithPartner, {observe: 'response'});
  }

  registerForMixed(registrationWithPartner: IRegistrationWithPartner): Observable<HttpResponse<IRegistration>> {
    return this.http.post<IRegistration>(this.registrationServerUrl + 'tournament/current/registrations/self/disciplineType/MIXED',
      registrationWithPartner, {observe: 'response'});
  }
}
