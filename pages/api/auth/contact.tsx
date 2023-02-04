import Contact from '../../../models/Contact';
import db from '../../../utils/db';

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, contactMessage } = req.body;
  // console.log(name, email, contactMessage);
  if (!name || !email || !email.includes('@') || !contactMessage) {
    res.status(422).json({
      message: 'Validation error machin truc',
    });
    return;
  }

  await db.connect();

  const existingContact = await Contact.findOne({ email: email });
  if (existingContact) {
    existingContact.contactMessage.push(contactMessage);
    await existingContact.save();
    await db.disconnect();
    res.status(201).send({
      message: 'Updated contact!',
      _id: existingContact._id,
      name: existingContact.name,
      email: existingContact.email,
      contactMessage: existingContact.contactMessage,
    });
  } else {
    const newContact = new Contact({
      name,
      email,
      contactMessage,
    });
    const contact = await newContact.save();
    await db.disconnect();
    res.status(201).send({
      message: 'Created contact!',
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      contactMessage: contact.contactMessage,
    });
  }
}

export default handler;
