import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactMessage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;
