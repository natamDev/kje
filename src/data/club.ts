// Identité légale : fiche officielle (SIREN 538 112 566) sur annuaire-entreprises.data.gouv.fr.
export const club = {
  nom: 'Dojo Kyokushin + Jujutsu Eskrima',
  nomLegal: 'Kyokushin Jutsu Escrima Aubagnais',
  formeJuridique: 'Association déclarée',
  siren: '538 112 566',
  siret: '538 112 566 00012',
  dateCreation: '1999-09-16',
  anneeCreation: 1999,
  adresse: {
    rue: '7 boulevard Amiral Ganteaume',
    codePostal: '13400',
    ville: 'Aubagne',
    pays: 'FR',
  },
  ficheOfficielle:
    'https://annuaire-entreprises.data.gouv.fr/entreprise/kyokushin-jutsu-escrima-aubagnais-538112566',
  email: 'kje.aubagne@gmail.com',
  telephone: '06 21 48 20 29',
  telephoneInternational: '+33621482029',
  directeurPublication: 'Gérard Calenge',
  hebergeur: {
    nom: 'Netlify, Inc.',
    adresse: '101 2nd Street, San Francisco, CA 94105, États-Unis',
    site: 'https://www.netlify.com',
  },
};

export const adresseComplete = `${club.adresse.rue}, ${club.adresse.codePostal} ${club.adresse.ville}`;
