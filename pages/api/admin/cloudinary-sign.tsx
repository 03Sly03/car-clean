// import { NextApiRequest, NextApiResponse } from 'next';

const cloudinary = require('cloudinary').v2;

export default function signature(req: any, res: any) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );
  console.log(signature);
  res.statusCode = 200;
  res.json({ signature, timestamp });
}
