import {Route} from '@angular/router';
import {RegistrationComponent} from './registration.component';
import {UserRouteAccessService} from '../core/auth/user-route-access-service';

export const REGISTRATION_ROUTE: Route = {
  path: 'registration',
  component: RegistrationComponent,
  data: {
    title: 'Turnieranmeldung',
    authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
};
