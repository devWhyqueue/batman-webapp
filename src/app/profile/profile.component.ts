import {Component, OnInit} from '@angular/core';
import {IUser} from '../core/user/user.model';
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
  user: IUser;

  success = false;
  removalConfirmed = false;

  profileForm = this.fb.group({
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    first: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    last: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL ]+$'))]],
    club: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(XRegExp('^[\\pL0-9 ]+$'))]],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService,
              private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.userService.identity().subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          first: user.firstName,
          last: user.lastName,
          email: user.email,
          club: user.club
        });

        this.user = user;
      }
    });
  }

  trimEmail() {
    const emailControl = this.profileForm.get(['email']);
    emailControl.setValue(emailControl.value.trim());
  }

  update(): void {
    this.success = false;

    this.user.firstName = this.profileForm.get('first').value;
    this.user.lastName = this.profileForm.get('last').value;
    this.user.email = this.profileForm.get('email').value;
    this.user.club = this.profileForm.get('club').value;

    this.userService.update(this.user).subscribe(() => {
        this.success = true;
        this.userService.authenticate(this.user);
      },
      response => this.processError(response));
  }

  confirmRemoval(): void {
    this.removalConfirmed = true;
  }

  delete(): void {
    this.userService.delete().subscribe(() => {
        this.loginService.logout();
        this.router.navigate(['']);
        this.toastrService.success('Dein Konto wurde erfolgreich gelöscht!', 'Konto entfernt');
      },
      () => this.toastrService.error('Versuche es später erneut.', 'Löschen fehlgeschlagen'));
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 409) {
      this.toastrService.error('Bitte wähle eine andere.', 'E-Mail-Adresse wird bereits verwendet');
    } else {
      this.toastrService.error('Versuche es später erneut.', 'Änderung fehlgeschlagen');
    }
  }

}
