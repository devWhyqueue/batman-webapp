import {Component, OnInit} from '@angular/core';
import {User} from '../core/user/user.model';
import {FormBuilder, Validators} from '@angular/forms';
import * as XRegExp from 'xregexp';
import {UserService} from '../core/auth/user.service';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../core/login/login.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  account: User;
  success = false;
  error = false;
  errorEmailExists = false;
  removalConfirmed = false;
  profileForm = this.fb.group({
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    first: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    club: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
  });

  constructor(private fb: FormBuilder, private accountService: UserService, private toastrService: ToastrService,
              private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.profileForm.patchValue({
          first: account.firstName,
          last: account.lastName,
          email: account.email,
          club: account.club
        });

        this.account = account;
      }
    });
  }

  update(): void {
    this.error = false;
    this.errorEmailExists = false;
    this.success = false;

    this.account.firstName = this.profileForm.get('first').value;
    this.account.lastName = this.profileForm.get('last').value;
    this.account.email = this.profileForm.get('email').value;
    this.account.club = this.profileForm.get('club').value;

    this.accountService.update(this.account).subscribe(() => {
        this.success = true;
        this.accountService.authenticate(this.account);
      },
      response => this.processError(response));
  }

  confirmRemoval(): void {
    this.removalConfirmed = true;
  }

  delete(): void {
    this.accountService.delete().subscribe(() => {
      this.loginService.logout();
      this.router.navigate(['']);
      this.toastrService.success('Dein Konto wurde erfolgreich gelöscht!');
    });
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 409) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

}
