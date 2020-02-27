import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class SharedLibsModule {}
