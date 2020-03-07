import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {LoginService} from '../../core/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authenticationError = false;

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
  }

  login(): void {
    this.loginService
    .login({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    })
    .subscribe(
      () => {
        this.authenticationError = false;
        this.activeModal.close();
        if (this.router.url === '/account/register' || this.router.url.startsWith('/account/activate')) {
          this.router.navigate(['']);
        }
      },
      () => (this.authenticationError = true)
    );
  }

  register(): void {
    this.activeModal.dismiss('to state register');
    this.router.navigate(['/account/register']);
  }
}
