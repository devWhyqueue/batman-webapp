import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SessionStorageService} from 'ngx-webstorage';
import {Observable, of, ReplaySubject} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';

import {StateStorageService} from './state-storage.service';
import {environment} from '../../../environments/environment';
import {IUser} from '../user/user.model';
import {Authority} from '../user/authority.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private registrationServerUrl = environment.registrationServer;
  private authServerUrl = environment.authServer;

  private userIdentity: IUser | null = null;
  private authenticationState = new ReplaySubject<IUser | null>(1);
  private userCache$?: Observable<IUser | null>;

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {
  }

  save(user: IUser): Observable<{}> {
    return this.http.post(this.authServerUrl + 'users', user);
  }

  update(account: IUser): Observable<{}> {
    return this.http.put(this.authServerUrl + 'users/self', account);
  }

  delete(): Observable<{}> {
    return this.http.delete(this.registrationServerUrl + 'players/self');
  }

  authenticate(identity: IUser | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.map((authority: Authority) => authority.name).some((authority: string) => {
      return authorities.includes(authority);
    });
  }

  identity(force?: boolean): Observable<IUser | null> {
    if (!this.userCache$ || force || !this.isAuthenticated()) {
      this.userCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap((user: IUser | null) => {
          this.authenticate(user);

          if (user) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.userCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<IUser | null> {
    return this.authenticationState.asObservable();
  }

  private fetch(): Observable<IUser> {
    return this.http.get<IUser>(this.authServerUrl + 'users/self');
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}
