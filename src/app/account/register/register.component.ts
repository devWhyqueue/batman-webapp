import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Gender} from '../../core/user/gender.enum';
import * as XRegExp from 'xregexp';
import {UserService} from '../../core/auth/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {
  Gender = Gender;

  // @ts-ignore
  @ViewChild('first')
  first?: ElementRef;

  success = false;

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    first: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    gender: [null, [Validators.required]],
    club: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService, private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    if (this.first) {
      this.first.nativeElement.focus();
    }
  }

  register(): void {
    const password = this.registerForm.get(['password']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.toastrService.error('Die Passwörter stimmen nicht überein.', 'Passwörter prüfen');
    } else {
      const firstName = this.registerForm.get(['first']).value;
      const lastName = this.registerForm.get(['last']).value;
      const gender = this.registerForm.get(['gender']).value;
      const club = this.registerForm.get(['club']).value;
      const email = this.registerForm.get(['email']).value;
      this.userService.save({firstName, lastName, gender, club, email, password}).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 409) {
      this.toastrService.error('Bitte wähle eine andere.', 'E-Mail-Adresse wird bereits verwendet');
    } else {
      this.toastrService.error('Versuche es später erneut.', 'Registrierung fehlgeschlagen');
    }
  }
}
