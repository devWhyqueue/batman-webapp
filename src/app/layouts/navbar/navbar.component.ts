import {Component, OnInit} from '@angular/core';
import {LoginModalService} from '../../core/login/login-modal.service';
import {LoginService} from '../../core/login/login.service';
import {Router} from '@angular/router';
import {UserService} from '../../core/auth/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginModalService: LoginModalService, private loginService: LoginService, private router: Router,
              private accountService: UserService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.loginModalService.open();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

}
