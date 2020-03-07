import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';

@NgModule({
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxTrimDirectiveModule
  ]
})
export class SharedLibsModule {}
