// Données d'exemple — à remplacer avant mise en ligne par les vraies valeurs du club.
export interface Tarif {
  label: string;
  prixCentimes: number;
  periode: 'an' | 'trimestre' | 'mois';
}

export const tarifs: Tarif[] = [
  { label: 'Adulte', prixCentimes: 35000, periode: 'an' },
  { label: 'Enfant (-16 ans)', prixCentimes: 25000, periode: 'an' },
  { label: 'Cours d\'essai', prixCentimes: 0, periode: 'mois' },
];

export function formatPrix(centimes: number): string {
  if (centimes === 0) return 'Gratuit';
  return `${(centimes / 100).toFixed(0)} €`;
}
