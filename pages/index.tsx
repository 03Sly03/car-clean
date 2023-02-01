/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Layout from '../components/Layout';
import PromotionBanner from '../components/PromotionBanner';
import Promotion from '../models/Promotion';
import { PromotionData } from '../src/types/datas';
import db from '../utils/db';

type Props = {
  promotion: PromotionData;
};

export default function Home({ promotion }: Props) {
  return (
    <Layout title="Accueil">
      <PromotionBanner promotion={promotion} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 mt-20 text-xl">
        <Link href="/usedVehicles">
          <div className="hover:scale-105 h-52 w-auto bg-[#ef7a3757] flex items-center justify-center shadow-lg shadow-gray-500 rounded-tl-[100px] rounded-br-[100px] m-5 relative">
            <img
              src="/images/card-home/parcauto.jpg"
              alt="parc automobile"
              className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
            />
            <h2 className="font-bold text-center tracking-widest absolute">
              Achat / Vente de véhicules d'occasion
            </h2>
          </div>
        </Link>
        <Link href="/maintenance/change-worn-parts">
          <div className="hover:scale-105 h-52 w-auto bg-[#2f2f4757] flex items-center justify-center shadow-lg shadow-gray-500 rounded-tl-[100px] rounded-br-[100px] m-5 relative">
            <img
              src="/images/card-home/maintenance.jpg"
              alt="parc automobile"
              className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
            />
            <h2 className="font-bold text-center tracking-widest absolute">
              Entretient courrant
            </h2>
          </div>
        </Link>
        <Link href="/maintenance/air-conditioner">
          <div className="hover:scale-105 h-52 w-auto bg-[#ef7a3757] flex items-center justify-center shadow-lg shadow-gray-500 rounded-tl-[100px] rounded-br-[100px] m-5 relative">
            <img
              src="/images/card-home/clim.jpg"
              alt="parc automobile"
              className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
            />
            <h2 className="font-bold text-center tracking-widest absolute">
              Recharge de climatisation
            </h2>
          </div>
        </Link>
        <Link href="/maintenance/tires">
          <div className="hover:scale-105 h-52 w-auto bg-[#2f2f4757] flex items-center justify-center shadow-lg shadow-gray-500 rounded-tl-[100px] rounded-br-[100px] m-5 relative">
            <img
              src="/images/card-home/tire.jpg"
              alt="parc automobile"
              className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
            />
            <h2 className="font-bold text-center tracking-widest absolute">
              Changement de pneumatique
            </h2>
          </div>
        </Link>
        <Link href="/maintenance/car-parts">
          <div className="hover:scale-105 h-52 w-auto bg-[#ef7a3757] flex items-center justify-center shadow-lg shadow-gray-500 rounded-tl-[100px] rounded-br-[100px] m-5 relative">
            <img
              src="/images/card-home/carpart.jpg"
              alt="parc automobile"
              className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
            />
            <h2 className="font-bold text-center tracking-widest absolute">
              Pièces détachées
            </h2>
          </div>
        </Link>
        <Link href="/maintenance/parallelism">
          <div className="hover:scale-105 h-52 w-auto bg-[#2f2f4757] flex items-center justify-center shadow-lg shadow-gray-500 rounded-tl-[100px] rounded-br-[100px] m-5 relative">
            <img
              src="/images/card-home/para.jpg"
              alt="parc automobile"
              className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
            />
            <h2 className="font-bold text-center tracking-widest absolute">
              Parallélisme
            </h2>
          </div>
        </Link>
      </div>
      <div className="mt-20 items-center mb-20 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="mb-10">
          <h2 className="font-bold text-5xl">Car'Clean</h2>
          <p className="mt-5 text-justify pr-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            doloribus veritatis architecto, consectetur suscipit laboriosam sed,
            perspiciatis minus ipsa ducimus nesciunt. Eius placeat nesciunt, ab
            commodi architecto maiores corporis? Enim beatae nulla illum placeat
            non recusandae. Suscipit iusto voluptatum quas provident ea animi
            cupiditate expedita architecto rerum minus aliquam atque.
          </p>
          <p className="mt-5 text-justify pr-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            doloribus veritatis architecto, consectetur suscipit laboriosam sed,
            perspiciatis minus ipsa ducimus nesciunt. Eius placeat nesciunt, ab
            commodi architecto maiores corporis? Enim beatae nulla illum placeat
            non recusandae. Suscipit iusto voluptatum quas provident ea animi
            cupiditate expedita architecto rerum minus aliquam atque.
          </p>
          <p className="mt-5 text-justify pr-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            doloribus veritatis architecto, consectetur suscipit laboriosam sed,
            perspiciatis minus ipsa ducimus nesciunt. Eius placeat nesciunt, ab
            commodi architecto maiores corporis? Enim beatae nulla illum placeat
            non recusandae. Suscipit iusto voluptatum quas provident ea animi
            cupiditate expedita architecto rerum minus aliquam atque
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/the-garage/front.jpg"
            alt="devanture du garage Car'Clean"
            className="rounded-full object-cover h-96 w-96"
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const promotions = await Promotion.find({ name: 'PROMOTION' }).lean();
  await db.disconnect();
  return {
    props: {
      promotion: db.convertDocToObj(promotions[0]),
    },
  };
}
