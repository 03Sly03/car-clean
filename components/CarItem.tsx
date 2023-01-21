/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { CarData } from '../src/types/datas';

type Props = {
  car: CarData;
};

function CarItem({ car }: Props) {
  return (
    <div className="card">
      <Link href={`/usedVehicles/${car.slug}`}>
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/usedVehicles/${car.slug}`}>
          <h2 className="text-lg">
            {car.brand} {car.model}
          </h2>
        </Link>
        <p className="mb-2">{car.mileage} km</p>
        <p className="bg-[#EF7937] p-3 rounded-3xl font-semibold tracking-widest">
          {car.price}€
        </p>
      </div>
    </div>
  );
}

export default CarItem;
