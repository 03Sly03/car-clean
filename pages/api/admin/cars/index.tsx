import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Car from '../../../../models/Car';
import db from '../../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const newCar = new Car({
    slug: 'sample-name-' + Math.random(),
    category: 'sample category',
    images: ['/images/cars/car.webp'],
    brand: 'sample brand',
    model: 'sample model',
    year: 2000,
    mileage: 0,
    description: 'sample description',
    price: 0,
    features: {
      energy: 'Gasoil',
      motorisation: '1,5L DCI',
      gearbox: 'Manuelle',
      guarantee: '6 mois',
      taxHorsePower: 6,
      dinHorses: 110,
      numberOfDoors: 5,
      numberOfPlaces: 5,
    },
  });

  const car = await newCar.save();
  await db.disconnect();
  res.send({ message: 'Car created successfully', car });
};
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const cars = await Car.find({});
  await db.disconnect();
  res.send(cars);
};
export default handler;
