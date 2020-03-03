import {State} from './state.enum';
import {ITournamentDiscipline} from './tournament-discipline.model';
import {formatDate} from '@angular/common';

export class StateInfo {

  static getTitle(state: State): string {
    let title: string;
    switch (state) {
      case State.WAITING:
        title = 'Auf Warteliste';
        break;
      case State.PAYMENT_PENDING:
        title = 'Meldegebühr ausstehend';
        break;
      case State.CONFIRMED:
        title = 'Anmeldung bestätigt';
        break;
      case State.REFUND_PENDING:
        title = 'Rückzahlung ausstehend';
        break;
      case State.CANCELLED:
        title = 'Erfolgreich abgemeldet';
        break;
    }
    return title;
  }

  static getDescription(state: State, tournamentDiscipline: ITournamentDiscipline): string {
    let description: string;
    switch (state) {
      case State.WAITING:
        description = 'Du befindest dich momentan auf der Warteliste. ' +
          'Sobald ein Platz in der Disziplin frei wird und Du dich an erster Position in der Warteliste befindest, ' +
          'wirst du automatisch in die Starterliste aufgenommen.';
        break;
      case State.PAYMENT_PENDING:
        description = 'Ein Platz auf der Starterliste ist für Dich reserviert. ' +
          `Bitte überweise jetzt die Meldegebühren von ${tournamentDiscipline.registrationFee}€. ` +
          'Nach erfolgreichem Eingang des Geldes wird die Meldung automatisch bestätigt.';
        break;
      case State.CONFIRMED:
        const start = formatDate(tournamentDiscipline.tournament.start, 'mediumDate', 'de');
        description = 'Deine Anmeldung wurde bestätigt. ' +
          `Du hast noch bis zum Turnierstart am ${start} Zeit zum Trainieren. Viel Spaß beim ${tournamentDiscipline.tournament.name}!`;
        break;
      case State.REFUND_PENDING:
        description = 'Deine Abmeldung wurde vor Meldeschluss wurde entgegengenommen. ' +
          'Die Meldegebühren werden in den nächsten Tagen erstattet werden.';
        break;
      case State.CANCELLED:
        description = 'Du hast dich erfolgreich abgemeldet. Schade, dass Du in diesem Jahr nicht dabei bist!';
        break;
    }
    return description;
  }
}
