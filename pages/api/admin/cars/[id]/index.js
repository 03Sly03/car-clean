import { getSession } from 'next-auth/react';
import Car from '../../../../../models/Car';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const car = await Car.findById(req.query.id);
  await db.disconnect();
  res.send(car);
};
const putHandler = async (req, res) => {
  await db.connect();
  const car = await Car.findById(req.query.id);
  if (car) {
    car.slug = req.body.slug;
    car.category = req.body.category;
    car.image = req.body.image;
    car.brand = req.body.brand;
    car.model = req.body.model;
    car.year = req.body.year;
    car.mileage = req.body.mileage;
    car.description = req.body.description;
    car.price = req.body.price;
    await car.save();
    await db.disconnect();
    res.send({ message: 'Car updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Car not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const car = await Car.findById(req.query.id);
  if (car) {
    await car.remove();
    await db.disconnect();
    res.send({ message: 'Car deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Car not found' });
  }
};
export default handler;
