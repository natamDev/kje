export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const paysage = { width: 1600, height: 1200 };
const portrait = { width: 1200, height: 1600 };

export const photosDojo: Photo[] = [
  { src: '/images/dojo/1.jpeg', alt: 'La salle d’entraînement, parquet et baies vitrées', ...paysage },
  { src: '/images/dojo/2.jpeg', alt: 'Vue en longueur de la salle d’entraînement', ...portrait },
  { src: '/images/dojo/3.jpeg', alt: 'La salle vue depuis le fond, côté miroirs et espaliers', ...paysage },
  { src: '/images/dojo/4.jpeg', alt: 'Les râteliers d’armes et le matériel de frappe', ...paysage },
  { src: '/images/dojo/5.jpeg', alt: 'Le mur d’honneur du dojo avec les drapeaux', ...paysage },
  { src: '/images/dojo/10.jpeg', alt: 'L’entrée de la salle, mannequin de frappe et espaliers', ...paysage },
  { src: '/images/dojo/11.jpeg', alt: 'L’espace d’accueil surplombant la salle', ...paysage },
  { src: '/images/dojo/8.jpeg', alt: 'Le vestiaire avec bancs et patères', ...portrait },
  { src: '/images/dojo/9.jpeg', alt: 'Le second vestiaire', ...portrait },
  { src: '/images/dojo/7.jpeg', alt: 'La douche', ...portrait },
  { src: '/images/dojo/6.jpeg', alt: 'Les sanitaires', ...portrait },
];
