/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Accueil">
      <div className="hover:scale-105 promo relative">
        <img
          src="/images/promos/pneus.jpg"
          alt="pneus de voiture"
          className="object-contain h-full w-full"
        />
        <div className="absolute bottom-0 right-5 bg-[#2f2f47da] text-[#ef7a37] font-extrabold tracking-widest p-8 w-56 rounded-br-[200px] rounded-tl-[200px] text-center">
          <h2>Promotion</h2>
          <p>-20 %</p>
        </div>
      </div>
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
        <Link href="/repair">
          <div className="hover:scale-105 h-52 w-auto bg-[#2f2f4757] flex items-center justify-center shadow-lg shadow-gray-500 rounded-tl-[100px] rounded-br-[100px] m-5 relative">
            <img
              src="/images/card-home/maintenance.jpg"
              alt="parc automobile"
              className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
            />
            <h2 className="font-bold text-center tracking-widest absolute">
              Faire réparer sa voiture
            </h2>
          </div>
        </Link>
        <Link href="/maintenance">
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
        <Link href="/maintenance">
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
        <Link href="/maintenance">
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
        <Link href="/maintenance">
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
