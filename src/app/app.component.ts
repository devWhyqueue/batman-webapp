import {Component, isDevMode, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private titleService: Title, private http: HttpClient) {
  }

  ngOnInit() {
    if (!isDevMode()) {
      // Wake up Heroku Dynos
      this.http.get(environment.registrationServer).toPromise().catch(() => console.log('Called registration service.'));
      this.http.get(environment.authServer).toPromise().catch(() => console.log('Called authentication service.'));
      this.http.get(environment.mailServer).toPromise().catch(() => console.log('Called mail service.'));
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data.title ? routeSnapshot.data.title : 'batman';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
