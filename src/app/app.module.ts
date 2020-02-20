import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {TableComponent} from './shared/table/table.component';
import {ParticipantsComponent} from './participants/participants.component';
import {ProfileComponent} from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { StatusComponent } from './status/status.component';
import { TrackerComponent } from './status/tracker/tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TableComponent,
    ParticipantsComponent,
    ProfileComponent,
    RegistrationComponent,
    StatusComponent,
    TrackerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
