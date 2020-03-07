import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {registerLocaleData} from '@angular/common';
import locale from '@angular/common/locales/de';
import {AuthInterceptor} from '../blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from '../blocks/interceptor/auth-expired.interceptor';
import {LoadingInterceptor} from '../blocks/interceptor/loading.interceptor';


@NgModule({
  imports: [
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {

  constructor() {
    registerLocaleData(locale);
  }
}
