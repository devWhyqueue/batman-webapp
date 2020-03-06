import { Component, OnInit } from '@angular/core';
import {ActivateService} from './activate.service';
import {LoginModalService} from '../../core/login/login-modal.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  error = false;
  success = false;

  constructor(private activateService: ActivateService, private loginModalService: LoginModalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(flatMap(params => this.activateService.activateUser(params.key))).subscribe(
      () => (this.success = true),
      () => (this.error = true)
    );
  }

  login(): void {
    this.loginModalService.open();
  }
}
