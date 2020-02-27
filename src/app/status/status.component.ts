import {Component, OnInit} from '@angular/core';
import {Step} from '../shared/model/step.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  singleSteps = [new Step('Auf Warteliste', 'lorem', true, false),
    new Step('Auf fsdgssdf', 'lorem', false, false),
    new Step('Auf sdfg', 'lorem', false, false)];

  doubleSteps = [new Step('Auf Warteliste', 'lorem', false, true),
    new Step('Auf fsdgssdf', 'lorem', true, false),
    new Step('Auf sdfg', 'lorem', false, false)];

  mixedSteps = [new Step('Auf Warteliste', 'lorem', false, true),
    new Step('Auf fsdgssdf', 'lorem', false, true),
    new Step('Auf sdfg', 'lorem', true, false)];

  constructor() {
  }

  ngOnInit() {
  }

}
