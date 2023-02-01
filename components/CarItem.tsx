/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { CarData } from '../src/types/datas';

type Props = {
  car: CarData;
};

function CarItem({ car }: Props) {
  return (
    <Link href={`/usedVehicles/${car.slug}`}>
      <div className="card hover:scale-110">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="rounded shadow"
        />
        <div className="flex flex-col items-center justify-center p-5">
          <h2 className="text-lg">
            {car.brand} {car.model}
          </h2>
          <p className="mb-2">{car.mileage} km</p>
          <p className="bg-[#EF7937] p-3 rounded-3xl font-semibold tracking-widest">
            {car.price}€
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CarItem;
