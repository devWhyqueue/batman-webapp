import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HOME_ROUTE} from './home/home.route';
import {PARTICIPANTS_ROUTE} from './participants/participants.route';
import {PROFILE_ROUTE} from './profile/profile.route';
import {REGISTRATION_ROUTE} from './registration/registration.route';
import {STATUS_ROUTE} from './status/status.route';

const routes: Routes = [HOME_ROUTE, PARTICIPANTS_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, STATUS_ROUTE];

@NgModule({
  imports: [RouterModule.forRoot([
    ...routes,
    {
      path: 'account',
      loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
