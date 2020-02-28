import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = ['../../assets/images/home/sp1.jpg', '../../assets/images/home/sp2.jpg', '../../assets/images/home/sp3.jpg'];
  tournament = {name: 'Stauseepokal 2020'};

  constructor() { }

  ngOnInit() {
  }

}
