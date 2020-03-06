import {Component, OnInit} from '@angular/core';
import {LoginModalService} from '../../core/login/login-modal.service';
import {LoginService} from '../../core/login/login.service';
import {Router} from '@angular/router';
import {UserService} from '../../core/auth/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  constructor(private loginModalService: LoginModalService, private loginService: LoginService, private router: Router,
              private accountService: UserService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.loginModalService.open();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
    this.toastr.success('Bis zum nächsten Mal...', 'Erfolgreich ausgeloggt');
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

}
