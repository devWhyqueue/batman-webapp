import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DisciplineType} from '../shared/model/discipline.enum';
import {FieldType} from '../shared/model/field.enum';
import {environment} from '../../environments/environment';
import {IDivision} from '../shared/model/division.model';

@Injectable({providedIn: 'root'})
export class DivisionService {
  private registrationServerUrl = environment.registrationServer;

  constructor(private http: HttpClient) {
  }

  findByDisciplineTypeAndFieldType(disciplineType: DisciplineType, fieldType: FieldType): Observable<HttpResponse<IDivision[]>> {
    const params = new HttpParams()
    .set('disciplineType', DisciplineType[String(disciplineType)])
    .set('fieldType', FieldType[String(fieldType)]);
    return this.http.get<IDivision[]>(this.registrationServerUrl + 'tournaments/current/divisions', {params, observe: 'response'});
  }
}
