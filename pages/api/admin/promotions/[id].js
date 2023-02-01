import { getSession } from 'next-auth/react';
import Promotion from '../../../../models/Promotion';
import db from '../../../../utils/db';

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
  const promotion = await Promotion.findById(req.query.id);
  await db.disconnect();
  res.send(promotion);
};
const putHandler = async (req, res) => {
  await db.connect();
  const promotion = await Promotion.findById(req.query.id);
  if (promotion) {
    promotion.name = req.body.name;
    promotion.serviceSlug = req.body.serviceSlug;
    promotion.serviceTitle = req.body.serviceTitle;
    promotion.serviceActivity = req.body.serviceActivity;
    promotion.serviceName = req.body.serviceName;
    promotion.reduction = req.body.reduction;
    await promotion.save();
    await db.disconnect();
    res.send({ message: 'Promotion updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Promotion not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const promotion = await Promotion.findById(req.query.id);
  if (promotion) {
    await promotion.remove();
    await db.disconnect();
    res.send({ message: 'Promotion deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Promotion not found' });
  }
};
export default handler;
