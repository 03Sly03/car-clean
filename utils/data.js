import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Romuald',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
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
  ],
};

export default data;
