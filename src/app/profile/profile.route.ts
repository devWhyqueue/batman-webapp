import {Route} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {UserRouteAccessService} from '../core/auth/user-route-access-service';

export const PROFILE_ROUTE: Route = {
  path: 'profile',
  component: ProfileComponent,
  data: {
    title: 'Profil',
    authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
};
