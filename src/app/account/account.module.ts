import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {accountState} from './account.route';
import {RegisterComponent} from './register/register.component';
import {ActivateComponent} from './activate/activate.component';
import {DseComponent} from './dse/dse.component';


@NgModule({
  declarations: [RegisterComponent, ActivateComponent, DseComponent],
  imports: [
    SharedModule, RouterModule.forChild(accountState)
  ]
})
export class AccountModule {
}
