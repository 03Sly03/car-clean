/* eslint-disable @next/next/no-img-element */
import React from 'react';

function UnderConstruction() {
  return (
    <div className="card-construction rounded-tl-[200px] rounded-br-[200px] relative">
      <img
        src="/images/underconstruction/image.avif"
        alt="Compte tour"
        className="absolute object-cover h-full w-full opacity-5 bottom-0 left-0 rounded-tl-[200px] rounded-br-[200px]"
      />
      <h2 className="text-center w-[75%] font-bold">
        La page est en cours de construction. Pour toutes informations, merci de
        prendre contact directement avec le garage.
      </h2>
      <div className="flex items-center flex-col w-[75%]">
        <h3 className="mb-5 font-bold text-2xl">CAR’CLEAN:</h3>
        <p className="text-center">
          33, rue de bully machin, 62610 Bully-les-Mines
        </p>
        <p className="text-center">Mail: carclean@car.fr</p>
        <p className="text-center">Tel: 06 06 06 06 06</p>
      </div>
    </div>
  );
}

export default UnderConstruction;
