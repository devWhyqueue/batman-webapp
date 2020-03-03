import {Route} from '@angular/router';
import {ParticipantsComponent} from './participants.component';

export const PARTICIPANTS_ROUTE: Route = {
  path: 'participants',
  component: ParticipantsComponent,
  data: {
    title: 'Teilnehmerlisten'
  }
};
