import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

  // TODO: Add impl
  isAuthenticated(): boolean {
    return false;
  }

}
