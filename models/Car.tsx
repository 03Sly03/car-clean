import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const carSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [{ type: String, required: true }],
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    features: {
      energy: { type: String, required: false },
      motorisation: { type: String, required: false },
      gearbox: { type: String, required: false },
      guarantee: { type: String, required: false },
      taxHorsePower: { type: Number, required: false },
      dinHorses: { type: Number, required: false },
      numberOfDoors: { type: Number, required: false },
      numberOfPlaces: { type: Number, required: false },
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);
export default Car;
