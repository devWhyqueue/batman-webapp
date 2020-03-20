import {Routes} from '@angular/router';
import {registerRoute} from './register/register.route';
import {activateRoute} from './activate/activate.route';
import {dseRoute} from './dse/dse.route';

const ACCOUNT_ROUTES = [registerRoute, activateRoute, dseRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];
