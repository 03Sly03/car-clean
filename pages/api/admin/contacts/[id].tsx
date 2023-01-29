import db from '../../../../utils/db';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import Contact from '../../../../models/Contact';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const contact = await Contact.findById(req.query.id);
  if (contact) {
    await contact.remove();
    await db.disconnect();
    res.send({ message: 'Contact Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Contact Not Found' });
  }
};

export default handler;
