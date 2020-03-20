import {Route} from '@angular/router';
import {DseComponent} from './dse.component';

export const dseRoute: Route = {
  path: 'dse',
  component: DseComponent,
  data: {
    title: 'Datenschutzerklärung'
  }
};
