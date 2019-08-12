import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { SharedModule } from '../shared/shared.module';
import { NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    NgbCarouselModule,
    RouterModule.forChild([HOME_ROUTE])
  ]
})
export class HomeModule {
}
