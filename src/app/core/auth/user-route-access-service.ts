import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StateStorageService } from './state-storage.service';
import {LoginModalService} from '../login/login-modal.service';
import {UserService} from './user.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private loginModalService: LoginModalService,
    private userService: UserService,
    private stateStorageService: StateStorageService,
    private toastrService: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const authorities = route.data.authorities;
    // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
    // that the client has a principal too, if they already logged in by the server.
    // This could happen on a page refresh.
    return this.checkLogin(authorities, state.url);
  }

  checkLogin(authorities: string[], url: string): Observable<boolean> {
    return this.userService.identity().pipe(
      map(user => {
        if (!authorities || authorities.length === 0) {
          return true;
        }

        if (user) {
          const hasAnyAuthority = this.userService.hasAnyAuthority(authorities);
          if (hasAnyAuthority) {
            return true;
          }
          if (isDevMode()) {
            console.error('User has not any of required authorities: ', authorities);
          }
          this.toastrService.error('Du hast nicht die nötigen Rechte, um darauf zuzugreifen.', 'Zugriff verweigert');
          return false;
        }

        this.stateStorageService.storeUrl(url);
        this.router.navigate(['']);
        this.loginModalService.open();
        return false;
      })
    );
  }
}
