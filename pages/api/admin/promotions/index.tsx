import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Promotion from '../../../../models/Promotion';
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
  const newPromotion = new Promotion({
    // image: '/images/promotion1.jpg',
    name: 'PROMOTION',
    serviceSlug: 'promo-slug' + Math.random(),
    serviceTitle: 'Entretient courrant',
    serviceActivity: 'Freins',
    serviceName: 'Plaquettes avant',
    reduction: 20,
  });

  const promotion = await newPromotion.save();
  await db.disconnect();
  res.send({ message: 'Promotion created successfully', promotion });
};
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const promotions = await Promotion.find({});
  await db.disconnect();
  res.send(promotions);
};
export default handler;
