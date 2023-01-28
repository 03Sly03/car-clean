/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

function UnderConstruction() {
  return (
    <div className="card-construction rounded-tl-[200px] rounded-br-[200px] relative">
      <img
        src="/images/underconstruction/image.avif"
        alt="Compte tour"
        className="absolute object-cover h-full w-full opacity-5 bottom-0 left-0 rounded-tl-[200px] rounded-br-[200px]"
      />
      <h2 className="text-center w-[75%] font-bold text-2xl">
        La page est en cours de construction. Pour toutes informations, merci de
        prendre contact directement avec le garage.
      </h2>
      <p className="z-0">
        Consultez nos{' '}
        <strong>
          <Link href="/usedVehicles" className="text-xl hover:text-2xl">
            véhicules d'occasion
          </Link>
        </strong>{' '}
        ! Venez les voirs{' '}
        <Link
          href="/usedVehicles"
          className="text-blue-500 hover:text-blue-800 active:text-blue-900 hover:text-xl"
        >
          ici
        </Link>{' '}
        !
      </p>
      <div className="flex items-center flex-col w-[75%]">
        <h3 className="mb-5 font-bold text-2xl">CAR’CLEAN:</h3>
        <p className="text-center font-bold">
          61, rue du 18 novembre 1869, 62610 Bully-les-Mines
        </p>
        <p className="text-center">
          Adresse mail: <strong className="text-xl">carclean@car.fr</strong>
        </p>
        <p className="text-center">
          Tel: <strong className="text-xl">06 06 06 06 06</strong>
        </p>
      </div>
    </div>
  );
}

export default UnderConstruction;
