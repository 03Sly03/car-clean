import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Romuald',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Rachid',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'Jean',
      email: 'user2@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  promotion: {
    name: 'PROMOTION',
    serviceSlug: 'change-worn-parts',
    serviceTitle: 'Entretient courrant',
    serviceActivity: 'Vidange',
    serviceName: 'Filtre à huile & huile',
    reduction: 20,
  },
  activities: [
    {
      title: 'Entretient courrant',
      slug: 'change-worn-parts',
      works: [
        {
          activity: 'Entretient courrant',
          name: 'Vidange',
          products: [
            {
              workName: 'Vidange',
              name: 'Filtre à huile & huile',
            },
            {
              workName: 'Vidange',
              name: 'Filtre à air',
            },
            {
              workName: 'Vidange',
              name: "Filtre d'habitacle",
            },
            {
              workName: 'Vidange',
              name: 'Filtre à carburant',
            },
          ],
        },
        {
          activity: 'Entretient courrant',
          name: 'Freins',
          products: [
            {
              workName: 'Freins',
              name: 'Plaquettes avant',
            },
            {
              workName: 'Freins',
              name: 'Plaquettes arrière',
            },
            {
              workName: 'Freins',
              name: 'Disques avant',
            },
            {
              workName: 'Freins',
              name: 'Disques arrière',
            },
          ],
        },
      ],
    },
    {
      title: 'Climatisation',
      slug: 'air-conditioner',
      works: [
        {
          activity: 'Climatisation',
          name: 'Recharge',
          products: [
            {
              workName: 'Recharge',
              name: 'Détection de fuite et recharge du fluide frigorigène',
            },
          ],
        },
      ],
    },
  ],
  cars: [
    {
      slug: 'renaut-laguna',
      category: 'voiture',
      images: [
        '/images/cars/laguna.webp',
        '/images/cars/laguna2.jpg',
        '/images/cars/laguna3.jpeg',
        '/images/cars/laguna4.jpg',
      ],
      brand: 'Renaut',
      model: 'Laguna',
      year: 2000,
      mileage: 255123,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 2590,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'clio2',
      category: 'voiture',
      images: ['/images/cars/clio2.webp'],
      brand: 'Renaut',
      model: 'Clio 2',
      year: 2001,
      mileage: 155000,
      description:
        'A saisir ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 1500,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: '307',
      category: 'voiture',
      images: ['/images/cars/307.webp'],
      brand: 'Peugeot',
      model: '307',
      year: 2003,
      mileage: 125062,
      description:
        'En voilà une bonne ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 6900,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: '405',
      category: 'voiture',
      images: ['/images/cars/405.webp'],
      brand: 'Peugeot',
      model: '405',
      year: 2005,
      mileage: 232000,
      description:
        'Celle là elle roule Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 3500,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'opel-astra-ecoflex',
      category: 'voiture',
      images: ['/images/cars/astraEcoFlex.webp'],
      brand: 'Opel',
      model: 'Astra',
      year: 2015,
      mileage: 88000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'citroen-c3',
      category: 'voiture',
      images: ['/images/cars/c3picasso.webp'],
      brand: 'Citroen',
      model: 'C3 Picasso',
      year: 2011,
      mileage: 42140,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 7490,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'chevrolet-captiva',
      category: 'voiture',
      images: ['/images/cars/captiva.webp'],
      brand: 'Chevrolet',
      model: 'Captiva',
      year: 2012,
      mileage: 138000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'fiat-500',
      category: 'voiture',
      images: ['/images/cars/f500.webp'],
      brand: 'Fiat',
      model: '500 II',
      year: 2008,
      mileage: 131698,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 5990,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'renaut-laguna-2',
      category: 'voiture',
      images: ['/images/cars/laguna.webp'],
      brand: 'Renaut',
      model: 'Laguna',
      year: 2000,
      mileage: 255123,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 2590,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'clio2-2',
      category: 'voiture',
      images: ['/images/cars/clio2.webp'],
      brand: 'Renaut',
      model: 'Clio 2',
      year: 2001,
      mileage: 155000,
      description:
        'A saisir ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 1500,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: '307-2',
      category: 'voiture',
      images: ['/images/cars/307.webp'],
      brand: 'Peugeot',
      model: '307',
      year: 2003,
      mileage: 125062,
      description:
        'En voilà une bonne ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 6900,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: '405-2',
      category: 'voiture',
      images: ['/images/cars/405.webp'],
      brand: 'Peugeot',
      model: '405',
      year: 2005,
      mileage: 232000,
      description:
        'Celle là elle roule Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 3500,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'opel-astra-ecoflex-2',
      category: 'voiture',
      images: ['/images/cars/astraEcoFlex.webp'],
      brand: 'Opel',
      model: 'Astra',
      year: 2015,
      mileage: 88000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'citroen-c3-2',
      category: 'voiture',
      images: ['/images/cars/c3picasso.webp'],
      brand: 'Citroen',
      model: 'C3 Picasso',
      year: 2011,
      mileage: 42140,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 7490,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'chevrolet-captiva-2',
      category: 'voiture',
      images: ['/images/cars/captiva.webp'],
      brand: 'Chevrolet',
      model: 'Captiva',
      year: 2012,
      mileage: 138000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
    {
      slug: 'fiat-500-2',
      category: 'voiture',
      images: ['/images/cars/f500.webp'],
      brand: 'Fiat',
      model: '500 II',
      year: 2008,
      mileage: 131698,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 5990,
      features: {
        energy: 'Gasoil',
        motorisation: '1.5L DCI',
        gearbox: 'Manuelle',
        guarantee: '3 mois',
        taxHorsePower: 6,
        dinHorses: 110,
        numberOfDoors: 5,
        numberOfPlaces: 5,
      },
    },
  ],
  maintenance: [
    {
      slug: 'change-worn-parts',
      title: 'Entretient courrant',
      description: 'Bla bla test 1 lorem machin',
      activities: [
        {
          name: 'Vidange',
          description: 'La vidange pour la voiture et pis tout ça',
          tasks: [
            {
              name: 'Filtre à huile & huile',
              description: 'Faut au moins changer tout ça',
              price: 103,
              minPrice: 10,
              time: [
                {
                  days: 0,
                  hours: 1,
                  minutes: 0,
                },
              ],
            },
          ],
        },
        {
          name: 'Vidange complète',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [
            {
              name: 'Filtre à huile & huile',
              description: 'ça fait parti du completitude...',
              price: 78,
              minPrice: 10,
              time: {
                days: 0,
                hours: 1,
                minutes: 0,
              },
            },
            {
              name: 'Filtre à air',
              description: 'Le filtre pour air du moteur hein',
              price: 25,
              minPrice: 10,
              time: {
                days: 0,
                hours: 1,
                minutes: 0,
              },
            },
            {
              name: 'Filtre à carburant',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 30,
              minPrice: 10,
              time: {
                days: 0,
                hours: 1,
                minutes: 0,
              },
            },
          ],
        },
        {
          name: 'Freins',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [
            {
              name: 'Plaquettes avant',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 30,
              minPrice: 15,
              time: {
                days: 0,
                hours: 0,
                minutes: 30,
              },
            },
            {
              name: 'Plaquettes arrière',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 25,
              minPrice: 15,
              time: {
                days: 0,
                hours: 0,
                minutes: 30,
              },
            },
            {
              name: 'Purge',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 40,
              minPrice: 40,
              time: {
                days: 0,
                hours: 0,
                minutes: 30,
              },
            },
          ],
        },
      ],
    },
    {
      slug: 'air-conditioner',
      title: 'Climatisation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
      activities: [
        {
          name: 'Recharge',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [
            {
              name: 'Ajout du fluide frigorigène',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 0,
              minPrice: 50,
              time: {
                days: 0,
                hours: 2,
                minutes: 30,
              },
            },
            {
              name: 'Détection de fuite',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 0,
              minPrice: 30,
              completionTime: {
                days: 0,
                hours: 1,
                minutes: 15,
              },
            },
          ],
        },
      ],
    },
    {
      slug: 'tires',
      title: 'Pneumatique',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
      activities: [
        {
          name: 'Changement des pneus',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [
            {
              name: 'Montage pneus',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 0,
              minPrice: 50,
              time: {
                days: 0,
                hours: 2,
                minutes: 30,
              },
            },
          ],
        },
        {
          name: 'Réparation',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [
            {
              name: 'Crevaison',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
              price: 0,
              minPrice: 50,
              time: {
                days: 0,
                hours: 2,
                minutes: 30,
              },
            },
          ],
        },
      ],
    },
    {
      slug: 'car-parts',
      title: 'Pièces détachées',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
      activities: [
        {
          name: 'Moteur',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [],
        },
        {
          name: 'Freinage',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [],
        },
      ],
    },
    {
      slug: 'parallelism',
      title: 'Parallèlisme',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
      activities: [
        {
          name: 'Avant',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [],
        },
        {
          name: 'Arrière',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ipsam voluptas ducimus velit minus? Dignissimos doloremque porro similique earum iusto.',
          tasks: [],
        },
      ],
    },
  ],
  carsFeaturesData: [
    {
      brand: 'Renault',
      family: [
        {
          brand: 'Renault',
          name: 'Clio',
          models: [
            {
              model: 'Clio',
              fullName: 'Clio II',
              name: 'II',
              type: [
                {
                  name: 'Diesel',
                  motorisation: [
                    '1.5 DCI 65cv',
                    '1.5 DCI 80cv',
                    '1.5 DCI 100cv',
                    '1.5 DCI Hatchback 70cv',
                  ],
                },
              ],
            },
          ],
        },
        {
          brand: 'Renault',
          name: 'Espace',
          models: [
            {
              model: 'Espace',
              fullName: 'Espace IV',
              name: 'IV Phase 2',
              type: [
                {
                  name: 'Essence',
                  motorisation: [
                    '2.0 i 16V Turbo 170cv',
                    '2.0 i 16V Turbo 170cv Boîte automatique',
                    '2.0 i 140cv',
                    '2.5 i V6 240cv Boîte automatique',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      brand: 'Opel',
      family: [
        {
          brand: 'Opel',
          name: 'Astra',
          models: [
            {
              model: 'Astra',
              name: 'F Cabriolet',
              type: [
                {
                  name: 'Essence',
                  motorisation: [
                    '1.4 i 16V 90cv',
                    '1.4 i 16V 90cv Boîte automatique',
                    '2.0 i 115cv',
                    '2.0 i 115cv Boîte automatique',
                  ],
                },
              ],
            },
          ],
        },
        {
          brand: 'Opel',
          name: 'Corsa',
          models: [
            {
              model: 'Corsa',
              name: 'A Hatchback',
              type: [
                {
                  name: 'Diesel',
                  motorisation: ['1.5 D 50cv', '1.5 TD 65cv'],
                },
                {
                  name: 'Essence',
                  motorisation: ['1.0 45cv', '1.2 45cv'],
                },
                {
                  name: 'GPL',
                  motorisation: ['1.0 45cv', '1.2 45cv'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  carsBrand: [
    {
      name: 'Renault',
    },
    {
      name: 'Opel',
    },
    {
      name: 'Peugeot',
    },
    {
      name: 'Citroen',
    },
    {
      name: 'Fiat',
    },
    {
      name: 'Toyota',
    },
  ],
  carsModel: [
    {
      name: 'Clio',
    },
    {
      name: 'Clio 2',
    },
    {
      name: 'Clio 3',
    },
    {
      name: 'Clio 4',
    },
    {
      name: 'Espace 1',
    },
    {
      name: 'Espace 2',
    },
    {
      name: 'Espace 3',
    },
    {
      name: 'Espace 4',
    },
    {
      name: 'C4 Picasso',
    },
    {
      name: 'C4',
    },
    {
      name: 'Xsara',
    },
    {
      name: 'Astra H',
    },
    {
      name: 'Corsa',
    },
    {
      name: 'Agila',
    },
    {
      name: 'Meriva',
    },
  ],
  type: ['Diesel', 'Essence', 'GPL'],
};

export default data;
