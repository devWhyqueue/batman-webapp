import { Component, OnInit } from '@angular/core';
import {Step} from '../shared/model/step.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  steps = [new Step('Auf Warteliste', 'lorem', false, true),
    new Step('Auf fsdgssdf', 'lorem', true, false),
    new Step('Auf sdfg', 'lorem', false, false)];

  constructor() { }

  ngOnInit() {
  }

}
