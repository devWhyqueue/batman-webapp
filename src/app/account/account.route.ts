import {Routes} from '@angular/router';
import {registerRoute} from './register/register.route';
import {activateRoute} from './activate/activate.route';

const ACCOUNT_ROUTES = [registerRoute, activateRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];
