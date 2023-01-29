import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Car from '../../../models/Car';
import Contact from '../../../models/Contact';
import User from '../../../models/User';
import db from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  await db.connect();

  const carsCount = await Car.countDocuments();
  const usersCount = await User.countDocuments();
  const contactsCount = await Contact.countDocuments();

  await db.disconnect();
  res.send({ carsCount, usersCount, contactsCount });
};

export default handler;
