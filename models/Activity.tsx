import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    works: [
      {
        acitivity: { type: String, required: false },
        name: { type: String, required: false },
        products: [
          {
            workName: { type: String, required: false },
            name: { type: String, required: false },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Activity =
  mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export default Activity;
