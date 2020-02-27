import {Route} from '@angular/router';
import {StatusComponent} from './status.component';
import {UserRouteAccessService} from '../core/auth/user-route-access-service';

export const STATUS_ROUTE: Route = {
  path: 'status',
  component: StatusComponent,
  data: {
    title: 'Status',
    authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
};
