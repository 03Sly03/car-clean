import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const maintenanceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    activities: [
      {
        name: { type: String, required: true },
        description: { type: String, required: false },
        tasks: [
          {
            name: { type: String, required: true },
            description: { type: String, required: false },
            price: { type: Number, required: false },
            minPrice: { type: Number, required: false },
            time: {
              days: { type: Number, required: false },
              hours: { type: Number, required: false },
              minutes: { type: Number, required: false },
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Maintenance =
  mongoose.models.Maintenance ||
  mongoose.model('Maintenance', maintenanceSchema);
export default Maintenance;
