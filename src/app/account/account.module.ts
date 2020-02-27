import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {accountState} from './account.route';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule, RouterModule.forChild(accountState)
  ]
})
export class AccountModule { }
