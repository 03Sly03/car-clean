import User from '../../../../models/User';
import db from '../../../../utils/db';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'PUT') {
    return putHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === 'admin@example.com') {
      return res.status(400).send({ message: 'Can not delete admin' });
    }
    await user.remove();
    await db.disconnect();
    res.send({ message: 'User Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User Not Found' });
  }
};

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin;
    await user.save();
    await db.disconnect();
    res.send({ message: 'User updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User not found' });
  }
};

export default handler;
