/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Page d'accueil">
      <div className="promo relative">
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 mt-20">
        <Link href="/usedVehicles">
          <div className="h-52 w-auto bg-[#ef7a3785] flex items-center justify-center shadow-md rounded-tl-[100px] rounded-br-[100px] m-5 relative">
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
        <div className="h-52 w-auto bg-[#2f2f4785] flex items-center justify-center shadow-md rounded-tl-[100px] rounded-br-[100px] m-5 relative">
          <img
            src="/images/card-home/parcauto.jpg"
            alt="parc automobile"
            className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
          />
          <h2 className="font-bold text-center tracking-widest absolute">
            Maintenance
          </h2>
        </div>
        <div className="h-52 w-auto bg-[#ef7a3785] flex items-center justify-center shadow-md rounded-tl-[100px] rounded-br-[100px] m-5 relative">
          <img
            src="/images/card-home/parcauto.jpg"
            alt="parc automobile"
            className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
          />
          <h2 className="font-bold text-center tracking-widest absolute">
            Recharge de climatisation
          </h2>
        </div>
        <div className="h-52 w-auto bg-[#2f2f4785] flex items-center justify-center shadow-md rounded-tl-[100px] rounded-br-[100px] m-5 relative">
          <img
            src="/images/card-home/parcauto.jpg"
            alt="parc automobile"
            className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
          />
          <h2 className="font-bold text-center tracking-widest absolute">
            Changement de pneumatique
          </h2>
        </div>
        <div className="h-52 w-auto bg-[#ef7a3785] flex items-center justify-center shadow-md rounded-tl-[100px] rounded-br-[100px] m-5 relative">
          <img
            src="/images/card-home/parcauto.jpg"
            alt="parc automobile"
            className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
          />
          <h2 className="font-bold text-center tracking-widest absolute">
            Pièces détachées
          </h2>
        </div>
        <div className="h-52 w-auto bg-[#2f2f4785] flex items-center justify-center shadow-md rounded-tl-[100px] rounded-br-[100px] m-5 relative">
          <img
            src="/images/card-home/parcauto.jpg"
            alt="parc automobile"
            className="object-cover h-full w-full rounded-tl-[100px] rounded-br-[100px] opacity-10"
          />
          <h2 className="font-bold text-center tracking-widest absolute">
            Parallélisme
          </h2>
        </div>
      </div>
    </Layout>
  );
}
