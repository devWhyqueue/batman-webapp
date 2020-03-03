import {Component, isDevMode, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = ['../../assets/images/home/sp1.jpg', '../../assets/images/home/sp2.jpg', '../../assets/images/home/sp3.jpg'];
  tournament = {name: 'Stauseepokal 2020'};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if (!isDevMode()) {
      // Wake up Heroku Dynos
      this.http.get(environment.registrationServer).toPromise();
      this.http.get(environment.authServer).toPromise();
    }
  }

}
