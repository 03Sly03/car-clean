import Layout from '../components/Layout';
import CarItem from '../components/CarItem';
// import data from '../utils/data';
import Link from 'next/link';
import db from '../utils/db';
import Car from '../models/Car';
import { CarData } from '../src/types/datas';

type Props = {
  cars: CarData[];
};

export default function UsedVehicles({ cars }: Props) {
  return (
    <Layout title="Véhicules d'occasion">
      <div className="mb-20">
        <Link
          href="/"
          className="font-extrabold bg-[#2F2F47] text-white p-3 rounded-xl"
        >
          Retour
        </Link>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10">
          {cars.map((car) => (
            <CarItem car={car} key={car.slug} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const cars = await Car.find().lean();
  return {
    props: {
      cars: cars.map(db.convertDocToObj),
    },
  };
}
