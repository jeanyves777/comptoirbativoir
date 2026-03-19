export const companyInfo = {
  name: 'Comptoir des Bâtisseurs Ivoiriens',
  shortName: 'CBI',
  tagline: 'Spécialiste en travaux d\'électricité Industrielle',
  description: 'Le COMPTOIR DES BATISSEURS IVOIRIENS met au service des professionnels son savoir-faire et sa forte expérience dans le domaine des installations électriques afin de réaliser leurs travaux d\'électricité industrielle, bâtiment, groupe électrogène et froid climatisation.',
  about: 'Nous mettons à votre disposition notre expertise acquise au fil des années, dans un esprit de partenariat gagnant-gagnant. Pendant toutes nos années d\'existence, nous avons développé l\'ensemble des connaissances et des savoir-faire nécessaires afin de répondre aux besoins des professionnels exerçant dans différents domaines d\'activité : industrie, construction de bâtiments, énergie secours et carrières.',
  mission: 'Notre réactivité, notre sérieux, notre sens de service et nos compétences font de notre société votre partenaire de confiance pour toutes les interventions.',
  address: '11 BP 112 Abidjan 11, Angré non loin de la cité GESTOCI',
  phones: ['+225 27 22 26 65 33', '+225 07 99 14 11 99', '+225 05 84 70 62 91'],
  emails: ['comptoirbatisseurivoiriens@gmail.com', 'info@comptoirbativoir.com'],
  website: 'comptoirbativoir.com',
  mapUrl: 'https://www.google.com/maps/place/5%C2%B024\'05.9%22N+3%C2%B057\'48.4%22W/@5.4016402,-3.9639916,183m',
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
  stats: {
    clients: 232,
    projects: 521,
    support: 1453,
    workers: 32,
  },
}

export const services = [
  {
    id: 'coffret-inverseur',
    title: 'Coffret Inverseur',
    shortDescription: 'Étude, conception et réalisation de tous vos coffrets inverseurs.',
    description: 'Notre équipe spécialisée conçoit et réalise des coffrets inverseurs sur mesure pour garantir la continuité de votre alimentation électrique. De l\'étude à la mise en service, nous assurons un travail de qualité conforme aux normes en vigueur.',
    icon: 'Zap',
    image: '/images/services/coffret.jpg',
  },
  {
    id: 'froid-climatisation',
    title: 'Froid & Climatisation',
    shortDescription: 'Installation, maintenance et dépannage de systèmes de climatisation.',
    description: 'Notre équipe reste à votre disposition pour tous vos travaux d\'installation, de maintenance préventive et de dépannage de systèmes de froid et climatisation. Nous intervenons sur toutes les marques avec efficacité.',
    icon: 'Snowflake',
    image: '/images/services/climatisation.jpg',
  },
  {
    id: 'groupe-electrogene',
    title: 'Groupe Électrogène',
    shortDescription: 'Étude, installation et mise en service de groupes électrogènes.',
    description: 'Nous assurons l\'étude, l\'installation et la mise en service de vos groupes électrogènes. Notre expertise couvre toutes les puissances et toutes les marques pour répondre à vos besoins en énergie de secours.',
    icon: 'BatteryCharging',
    image: '/images/services/groupe-electrogene.jpg',
  },
  {
    id: 'maintenance-preventive',
    title: 'Maintenance Préventive',
    shortDescription: 'Suivi régulier et maintenance préventive de vos équipements.',
    description: 'Pour un meilleur suivi de vos groupes électrogènes et équipements électriques, nous vous proposons une maintenance préventive régulière et annuelle. Vidange, réparation et contrôle complet.',
    icon: 'Wrench',
    image: '/images/services/maintenance.jpg',
  },
  {
    id: 'module-ecran',
    title: 'Module & Écran',
    shortDescription: 'Fourniture et installation de modules et écrans de contrôle.',
    description: 'Nous nous occupons de tous types d\'écrans et modules de contrôle pour vos installations électriques et groupes électrogènes. Remplacement, configuration et mise en service.',
    icon: 'Monitor',
    image: '/images/services/module-ecran.jpg',
  },
  {
    id: 'electricite-batiment',
    title: 'Électricité Bâtiment & Industrielle',
    shortDescription: 'Installation et câblage électrique bâtiment et industriel.',
    description: 'Installation et câblage de coffrets électriques bâtiment et industriels. Nous intervenons dans l\'installation électrique industrielle, l\'alimentation des machines, l\'éclairage, les mises en conformité et le câblage d\'armoires.',
    icon: 'Building2',
    image: '/images/services/electricite.jpg',
  },
]

export const partners = [
  { name: 'ALBAYANE', logo: '/images/partners/albayane.webp' },
  { name: 'L\'Imprimerie Nationale de CI', logo: '/images/partners/imprimerie.jpg' },
  { name: 'CI-PHARM', logo: '/images/partners/cipharm.jpg' },
]

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'La Société' },
  { href: '/services', label: 'Nos Services' },
  { href: '/training', label: 'Formation' },
  { href: '/contact', label: 'Contact' },
]

export const expertise = [
  'Installation électrique industrielle',
  'Groupe électrogène',
  'Alimentation des machines',
  'Économie d\'énergie',
  'Démarrage moteurs',
  'Alimentation HT, MT, BT',
  'Éclairage intérieur/extérieur/sécurité',
  'Mises en conformité',
  'Câblage d\'armoires',
  'Froid climatisation',
  'Supervision & Conseils',
]
