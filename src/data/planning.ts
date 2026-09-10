// Données d'exemple — à remplacer avant mise en ligne par les vraies valeurs du club.
export interface Creneau {
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  heureDebut: string;
  heureFin: string;
  cours: string;
  niveau: string;
}

export const creneaux: Creneau[] = [
  { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:30', cours: 'Kyokushin', niveau: 'Tous niveaux' },
  { jour: 'Mercredi', heureDebut: '19:00', heureFin: '20:30', cours: 'Jujutsu Eskrima', niveau: 'Adultes' },
  { jour: 'Samedi', heureDebut: '10:00', heureFin: '11:30', cours: 'Kyokushin', niveau: 'Enfants' },
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
