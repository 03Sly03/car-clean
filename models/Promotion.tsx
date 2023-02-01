import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const promotionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serviceSlug: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    serviceActivity: { type: String, required: true },
    serviceName: { type: String, required: true },
    reduction: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Promotion =
  mongoose.models.Promotion || mongoose.model('Promotion', promotionSchema);
export default Promotion;
