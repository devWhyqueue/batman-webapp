import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Gender} from '../../core/user/gender.enum';
import * as XRegExp from 'xregexp';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Gender = Gender;

  // @ts-ignore
  @ViewChild('email')
  email?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  success = false;

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    first: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    gender: ['', [Validators.required]],
    club: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
  });

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
  }

  ngOnInit() {
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;

    const password = this.registerForm.get(['password']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = true;
    } else {
      const firstName = this.registerForm.get(['first']).value;
      const lastName = this.registerForm.get(['last']).value;
      const gender = this.registerForm.get(['gender']).value;
      const club = this.registerForm.get(['club']).value;
      const email = this.registerForm.get(['email']).value;
      this.registerService.save({firstName, lastName, gender, club, email, password}).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
