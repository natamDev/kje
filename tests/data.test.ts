import { describe, expect, it } from 'vitest';
import { groupByJour, type Creneau } from '../src/data/planning';
import { formatPrix } from '../src/data/tarifs';

describe('groupByJour', () => {
  it('regroupe les créneaux par jour dans l\'ordre de la semaine', () => {
    const creneaux: Creneau[] = [
      { jour: 'Samedi', heureDebut: '10:00', heureFin: '11:30', cours: 'Kyokushin', niveau: 'Enfants' },
      { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:30', cours: 'Kyokushin', niveau: 'Tous niveaux' },
    ];
    const grouped = groupByJour(creneaux);
    expect(Object.keys(grouped)).toEqual(['Lundi', 'Samedi']);
  });

  it('trie les créneaux d\'un même jour par heure de début', () => {
    const creneaux: Creneau[] = [
      { jour: 'Lundi', heureDebut: '19:00', heureFin: '20:00', cours: 'B', niveau: 'X' },
      { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:00', cours: 'A', niveau: 'X' },
    ];
    const grouped = groupByJour(creneaux);
    expect(grouped['Lundi'].map((c) => c.cours)).toEqual(['A', 'B']);
  });

  it('omet les jours sans créneau', () => {
    expect(groupByJour([])).toEqual({});
  });
});

describe('formatPrix', () => {
  it('formate un prix en euros sans décimales', () => {
    expect(formatPrix(35000)).toBe('350 €');
  });

  it('affiche "Gratuit" pour un prix à zéro', () => {
    expect(formatPrix(0)).toBe('Gratuit');
  });

  it('formate les petits montants', () => {
    expect(formatPrix(3500)).toBe('35 €');
  });
});