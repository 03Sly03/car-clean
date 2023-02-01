import User from '../../models/User';
import db from '../../utils/db';
import data from '../../utils/data';
import { NextApiHandler } from 'next';
import Car from '../../models/Car';
import Maintenance from '../../models/Maintenance';
import Promotion from '../../models/Promotion';

const handler: NextApiHandler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Car.deleteMany();
  await Car.insertMany(data.cars);
  await Maintenance.deleteMany();
  await Maintenance.insertMany(data.maintenance);
  await Promotion.deleteMany();
  await Promotion.insertMany(data.promotion);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
