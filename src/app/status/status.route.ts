import {Route} from '@angular/router';
import {StatusComponent} from './status.component';

export const STATUS_ROUTE: Route = {
  path: 'status',
  component: StatusComponent,
  data: {
    title: 'Status'
  }
};
