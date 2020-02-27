import {Routes} from '@angular/router';
import {registerRoute} from './register/register.route';

const ACCOUNT_ROUTES = [registerRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];
