import Layout from '../components/Layout';
import CarItem from '../components/CarItem';
import data from '../utils/data';
import Link from 'next/link';

export default function UsedVehicles() {
  return (
    <Layout title="Véhicule d'occasion">
      <Link
        href="/"
        className="font-extrabold bg-[#2F2F47] text-white p-3 rounded-xl"
      >
        Retour
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {data.cars.map((car) => (
          <CarItem car={car} key={car.slug} />
        ))}
      </div>
    </Layout>
  );
}
