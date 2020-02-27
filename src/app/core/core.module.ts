import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  imports: [
    HttpClientModule,
    ToastrModule.forRoot()
  ]
})
export class CoreModule { }
