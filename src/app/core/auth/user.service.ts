import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SessionStorageService} from 'ngx-webstorage';
import {Observable, of, ReplaySubject} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';

import {StateStorageService} from './state-storage.service';
import {environment} from '../../../environments/environment';
import {User} from '../user/user.model';
import {Authority} from '../user/authority.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private authServerUrl = environment.authServer;

  private userIdentity: User | null = null;
  private authenticationState = new ReplaySubject<User | null>(1);
  private accountCache$?: Observable<User | null>;

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {
  }

  save(account: User): Observable<{}> {
    return this.http.post(this.authServerUrl + 'users', account);
  }

  authenticate(identity: User | null): void {
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

  identity(force?: boolean): Observable<User | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap((account: User | null) => {
          this.authenticate(account);

          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<User | null> {
    return this.authenticationState.asObservable();
  }

  private fetch(): Observable<User> {
    return this.http.get<User>(this.authServerUrl + 'users/self');
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
