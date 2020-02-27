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
export class LoginComponent implements AfterViewInit {
  @ViewChild('mail', { static: false })
  mail?: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    mail: [''],
    password: ['']
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    if (this.mail) {
      this.mail.nativeElement.focus();
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    this.activeModal.dismiss('cancel');
  }

  login(): void {
    this.loginService
    .login({
      mail: this.loginForm.get('mail').value,
      password: this.loginForm.get('password').value
    })
    .subscribe(
      () => {
        this.authenticationError = false;
        this.activeModal.close();
        if (this.router.url === '/account/register') {
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
