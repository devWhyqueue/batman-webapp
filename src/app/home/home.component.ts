import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private images = ['../../assets/images/home/sp1.jpg', '../../assets/images/home/sp2.jpg', '../../assets/images/home/sp3.jpg'];
  private tournament;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }

}
