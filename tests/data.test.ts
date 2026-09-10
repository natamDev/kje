import { describe, expect, it } from 'vitest';
import { groupByJour, type Creneau } from '../src/data/planning';
import { formatPrix } from '../src/data/tarifs';

describe('groupByJour', () => {
  it('regroupe les creneaux par jour dans l\'ordre de la semaine', () => {
    const creneaux: Creneau[] = [
      { jour: 'Samedi', heureDebut: '10:00', heureFin: '11:30', cours: 'Kyokushin', niveau: 'Enfants' },
      { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:30', cours: 'Kyokushin', niveau: 'Tous niveaux' },
    ];
    const grouped = groupByJour(creneaux);
    expect(Object.keys(grouped)).toEqual(['Lundi', 'Samedi']);
  });

  it('trie les creneaux d\'un meme jour par heure de debut', () => {
    const creneaux: Creneau[] = [
      { jour: 'Lundi', heureDebut: '19:00', heureFin: '20:00', cours: 'B', niveau: 'X' },
      { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:00', cours: 'A', niveau: 'X' },
    ];
    const grouped = groupByJour(creneaux);
    expect(grouped['Lundi'].map((c) => c.cours)).toEqual(['A', 'B']);
  });

  it('omet les jours sans creneau', () => {
    expect(groupByJour([])).toEqual({});
  });
});

describe('formatPrix', () => {
  it('formate un prix en euros sans decimales', () => {
    expect(formatPrix(35000)).toBe('350 €');
  });

  it('affiche "Gratuit" pour un prix a zero', () => {
    expect(formatPrix(0)).toBe('Gratuit');
  });
});
