// Tarifs de la saison 2026-2027 (fiche d'inscription du club).
export const saison = '2026-2027';

export interface Tarif {
  label: string;
  prixCentimes: number;
  periode: 'saison' | 'mois';
}

// Calculées pour deux cours par semaine, de septembre à juin.
export const cotisations: Tarif[] = [
  { label: 'Moins de 10 ans', prixCentimes: 3500, periode: 'mois' },
  { label: 'Moins de 18 ans', prixCentimes: 4000, periode: 'mois' },
  { label: 'Plus de 18 ans', prixCentimes: 4500, periode: 'mois' },
];

export const coursEssai: Tarif = { label: 'Cours d’essai', prixCentimes: 0, periode: 'mois' };

export const fraisAnnuels: Tarif[] = [
  { label: 'Licence', prixCentimes: 4000, periode: 'saison' },
  { label: 'Inscription', prixCentimes: 4000, periode: 'saison' },
];

export interface Equipement {
  label: string;
  prixCentimes?: number;
  note?: string;
}

export const equipement: Equipement[] = [
  { label: 'Bas de kimono de type karaté, noir' },
  { label: 'Tee-shirt Kyokushin Jutsu Eskrima', prixCentimes: 3000, note: 'en vente au club' },
  { label: 'Bâton mousse', prixCentimes: 3000, note: 'en vente au club' },
];

export const libellePeriode: Record<Tarif['periode'], string> = {
  saison: 'par saison',
  mois: 'par mois',
};

export function formatPrix(centimes: number): string {
  if (centimes === 0) return 'Gratuit';
  return `${(centimes / 100).toFixed(0)} €`;
}
