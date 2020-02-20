import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  singleHeaders = ['Vorname', 'Nachname', 'Verein'];
  doubleHeaders = ['Spieler', 'Verein', 'Partner', 'Verein'];
  mixedHeaders = ['Spieler', 'Verein', 'Partnerin', 'Verein'];
  singles = [{1: 'Marius', 2: 'Muster', 3: 'ATV Musterstadt'}];
  doubles = [{1: 'Marius Muster', 2: 'ATV Musterstadt', 3: 'Jonas Meier', 4: 'ATV Musterstadt'}];
  mixeds = [{1: 'Marius Muster', 2: 'ATV Musterstadt', 3: 'Janine Meier', 4: 'ATV Musterstadt'}];

  constructor() {
  }

  ngOnInit() {
  }

}
