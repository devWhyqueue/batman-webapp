import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {ParticipantsComponent} from './participants/participants.component';
import {ProfileComponent} from './profile/profile.component';
import {RegistrationComponent} from './registration/registration.component';
import {StatusComponent} from './status/status.component';
import {TrackerComponent} from './status/tracker/tracker.component';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ParticipantsComponent,
    ProfileComponent,
    RegistrationComponent,
    StatusComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
