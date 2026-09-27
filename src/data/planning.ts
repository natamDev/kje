// Horaires de la saison 2026-2027 (fiche d'inscription du club).
export interface Creneau {
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  heureDebut: string;
  heureFin: string;
  cours: string;
  niveau: string;
}

export const creneaux: Creneau[] = [
  { jour: 'Mardi', heureDebut: '18:00', heureFin: '19:00', cours: 'Kyokushin Jutsu Eskrima', niveau: 'Enfants' },
  { jour: 'Mardi', heureDebut: '19:15', heureFin: '20:30', cours: 'Kyokushin Jutsu Eskrima', niveau: 'Adultes confirmés' },
  { jour: 'Jeudi', heureDebut: '18:00', heureFin: '19:00', cours: 'Kyokushin Jutsu Eskrima', niveau: 'Enfants' },
  { jour: 'Jeudi', heureDebut: '19:15', heureFin: '20:30', cours: 'Kyokushin Jutsu Eskrima', niveau: 'Adultes confirmés' },
];

const ORDRE_JOURS: Creneau['jour'][] = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche',
];

export function groupByJour(items: Creneau[]): Record<string, Creneau[]> {
  const grouped: Record<string, Creneau[]> = {};
  for (const jour of ORDRE_JOURS) {
    const forDay = items
      .filter((c) => c.jour === jour)
      .sort((a, b) => a.heureDebut.localeCompare(b.heureDebut));
    if (forDay.length > 0) grouped[jour] = forDay;
  }
  return grouped;
}
