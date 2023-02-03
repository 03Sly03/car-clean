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
    slug: 'car - ' + Math.random(),
    category: 'Aucune',
    images: ['/images/cars/car.webp'],
    brand: 'N/C',
    model: 'N/C',
    year: 2000,
    mileage: 0,
    description: 'N/C',
    price: 0,
    features: {
      energy: 'N/C',
      motorisation: 'N/C',
      gearbox: 'N/C',
      guarantee: 'N/C',
      taxHorsePower: null,
      dinHorses: null,
      numberOfDoors: null,
      numberOfPlaces: null,
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
