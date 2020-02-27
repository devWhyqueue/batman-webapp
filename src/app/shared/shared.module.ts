import {TableComponent} from './table/table.component';
import {SharedLibsModule} from './shared-libs.module';
import {NgModule} from '@angular/core';
import { LoginComponent } from './login/login.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [TableComponent, LoginComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginComponent],
  exports: [
    SharedLibsModule,
    TableComponent,
    LoginComponent
  ]
})
export class SharedModule {}
