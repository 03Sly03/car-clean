/* eslint-disable @next/next/no-img-element */
// import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

function CarScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const car = data.cars.find((x) => x.slug === slug);
  if (!car) {
    return <div>voiture non trouvé</div>;
  }

  return (
    <Layout title="Véhicules d'occasion">
      <Link
        href="/usedVehicles"
        className="font-extrabold bg-[#2F2F47] text-white p-3 rounded-xl"
      >
        Retour
      </Link>
      <h1 className="text-lg font-bold text-center mt-10 bg-[#EF7937] p-3 rounded-3xl tracking-widest mb-5">
        {car.brand} {car.model} - {car.year}
        <p className="mt-1 text-center font-bold">{car.mileage} km</p>
      </h1>
      <div className="py-2">
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2 md:w-80 lg:w-full h-auto">
            <img
              className="rounded-lg"
              src={car.image}
              alt={car.brand + ' ' + car.model}
            />
          </div>
          <div className="lg:pl-5 lg:pr-5">
            <h2 className="font-bold mt-5">Description:</h2>
            <p className="text-justify">{car.description}</p>
          </div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between font-bold tracking-widest">
                <div>Prix</div>
                <div>{car.price}€</div>
              </div>
              {/* <div className="mb-2 flex justify-between">
              <div>Status</div>
            </div> */}
              <button className="bg-[#EF7937] w-full rounded-3xl font-bold p-2">
                Ou aller voir cette voiture ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CarScreen;
