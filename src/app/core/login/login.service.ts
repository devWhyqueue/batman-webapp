import {Injectable} from '@angular/core';
import {Login} from './login.model';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {UserService} from '../auth/user.service';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {User} from '../user/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: UserService, private authServerProvider: AuthServerProvider) {}

  login(credentials: Login): Observable<User | null> {
   return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
