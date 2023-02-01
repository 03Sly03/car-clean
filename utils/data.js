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
  cars: [
    {
      slug: 'renaut-laguna',
      category: 'voiture',
      image: '/images/cars/laguna.webp',
      brand: 'Renaut',
      model: 'Laguna',
      year: 2000,
      mileage: 255123,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 2590,
    },
    {
      slug: 'clio2',
      category: 'voiture',
      image: '/images/cars/clio2.webp',
      brand: 'Renaut',
      model: 'Clio 2',
      year: 2001,
      mileage: 155000,
      description:
        'A saisir ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 1500,
    },
    {
      slug: '307',
      category: 'voiture',
      image: '/images/cars/307.webp',
      brand: 'Peugeot',
      model: '307',
      year: 2003,
      mileage: 125062,
      description:
        'En voilà une bonne ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 6900,
    },
    {
      slug: '405',
      category: 'voiture',
      image: '/images/cars/405.webp',
      brand: 'Peugeot',
      model: '405',
      year: 2005,
      mileage: 232000,
      description:
        'Celle là elle roule Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 3500,
    },
    {
      slug: 'opel-astra-ecoflex',
      category: 'voiture',
      image: '/images/cars/astraEcoFlex.webp',
      brand: 'Opel',
      model: 'Astra',
      year: 2015,
      mileage: 88000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
    },
    {
      slug: 'citroen-c3',
      category: 'voiture',
      image: '/images/cars/c3picasso.webp',
      brand: 'Citroen',
      model: 'C3 Picasso',
      year: 2011,
      mileage: 42140,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 7490,
    },
    {
      slug: 'chevrolet-captiva',
      category: 'voiture',
      image: '/images/cars/captiva.webp',
      brand: 'Chevrolet',
      model: 'Captiva',
      year: 2012,
      mileage: 138000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
    },
    {
      slug: 'fiat-500',
      category: 'voiture',
      image: '/images/cars/f500.webp',
      brand: 'Fiat',
      model: '500 II',
      year: 2008,
      mileage: 131698,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 5990,
    },
    {
      slug: 'renaut-laguna-2',
      category: 'voiture',
      image: '/images/cars/laguna.webp',
      brand: 'Renaut',
      model: 'Laguna',
      year: 2000,
      mileage: 255123,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 2590,
    },
    {
      slug: 'clio2-2',
      category: 'voiture',
      image: '/images/cars/clio2.webp',
      brand: 'Renaut',
      model: 'Clio 2',
      year: 2001,
      mileage: 155000,
      description:
        'A saisir ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 1500,
    },
    {
      slug: '307-2',
      category: 'voiture',
      image: '/images/cars/307.webp',
      brand: 'Peugeot',
      model: '307',
      year: 2003,
      mileage: 125062,
      description:
        'En voilà une bonne ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 6900,
    },
    {
      slug: '405-2',
      category: 'voiture',
      image: '/images/cars/405.webp',
      brand: 'Peugeot',
      model: '405',
      year: 2005,
      mileage: 232000,
      description:
        'Celle là elle roule Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.',
      price: 3500,
    },
    {
      slug: 'opel-astra-ecoflex-2',
      category: 'voiture',
      image: '/images/cars/astraEcoFlex.webp',
      brand: 'Opel',
      model: 'Astra',
      year: 2015,
      mileage: 88000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
    },
    {
      slug: 'citroen-c3-2',
      category: 'voiture',
      image: '/images/cars/c3picasso.webp',
      brand: 'Citroen',
      model: 'C3 Picasso',
      year: 2011,
      mileage: 42140,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 7490,
    },
    {
      slug: 'chevrolet-captiva-2',
      category: 'voiture',
      image: '/images/cars/captiva.webp',
      brand: 'Chevrolet',
      model: 'Captiva',
      year: 2012,
      mileage: 138000,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 11990,
    },
    {
      slug: 'fiat-500-2',
      category: 'voiture',
      image: '/images/cars/f500.webp',
      brand: 'Fiat',
      model: '500 II',
      year: 2008,
      mileage: 131698,
      description:
        "Une bonne voiture d'occaz ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam nobis iste quasi, itaque est tempore ea sunt quisquam, dignissimos accusantium culpa accusamus eius illum odio a dolorum magni aut minima, molestias non quo dolores labore neque? Cumque, inventore eveniet minus qui veritatis non nesciunt.",
      price: 5990,
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
};

export default data;
