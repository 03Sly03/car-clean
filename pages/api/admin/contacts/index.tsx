import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Contact from '../../../../models/Contact';
import db from '../../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const contacts = await Contact.find({});
  await db.disconnect();
  res.send(contacts);
};
export default handler;
