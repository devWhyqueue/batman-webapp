import {Component, Input, OnInit} from '@angular/core';
import {IStep} from '../../shared/model/step.model';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  @Input()
  steps: IStep[];

  constructor() {
  }

  ngOnInit() {
  }

}
