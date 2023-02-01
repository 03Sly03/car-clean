/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
// import Promotion from '../models/Promotion';
import { PromotionData } from '../src/types/datas';
// import data from '../utils/data';
// import db from '../utils/db';

type Props = {
  promotion: PromotionData;
};

function PromotionBanner({ promotion }: Props) {
  return (
    <Link href={`/maintenance/${promotion.serviceSlug}`}>
      <div className="hover:scale-105 promo relative overflow-hidden">
        <img
          src="/images/promos/pneus.jpg"
          alt="pneus de voiture"
          className="object-contain h-full w-full"
        />
        <div className="absolute bottom-0 left-0 bg-[#2f2f47da] text-[#ef7a37] font-extrabold tracking-widest px-8 sm:px-16 py-5 mr-10 rounded-br-[200px] rounded-tl-[200px] text-center text-sm md:text-base">
          <h2>
            {promotion.name} - {promotion.serviceTitle}
          </h2>
          <p className="text-xl">{promotion.serviceActivity}</p>
          <p>{promotion.serviceName}</p>
          <p>-{promotion.reduction} %</p>
        </div>
      </div>
    </Link>
  );
}

export default PromotionBanner;
