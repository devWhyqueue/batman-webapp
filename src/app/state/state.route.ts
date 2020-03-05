import {Route} from '@angular/router';
import {StateComponent} from './state.component';
import {UserRouteAccessService} from '../core/auth/user-route-access-service';

export const STATUS_ROUTE: Route = {
  path: 'status',
  component: StateComponent,
  data: {
    title: 'Status',
    authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
};
