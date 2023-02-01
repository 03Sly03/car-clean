/* eslint-disable @next/next/no-img-element */
// import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Layout from '../../components/Layout';
import Car from '../../models/Car';
import db from '../../utils/db';

function CarScreen(props: any) {
  const { car } = props;
  if (!car) {
    return <div>voiture non trouvé</div>;
  }

  return (
    <Layout title="Véhicules d'occasion">
      <div className="mb-20">
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
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 md:space-x-10 mb-14 md:mb-8">
            <Carousel
              showArrows={false}
              autoPlay
              interval={2500}
              infiniteLoop
              showThumbs={true}
            >
              {car.images.map((image: string, index: number) => (
                <div key={index}>
                  <img src={image} alt={car.name} />
                </div>
              ))}
            </Carousel>
            <div className="lg:pl-5 lg:pr-5">
              <h2 className="font-bold my-5">Description:</h2>
              <p className="text-justify">{car.description}</p>
              <h2 className="font-bold my-5">Caractèristiques:</h2>
              {Object.keys(car.features).map((feature, index) => (
                <p key={index} className="flex justify-between border-b mb-3">
                  <span className="font-semibold">{feature}:</span>{' '}
                  {car.features[feature]}
                </p>
              ))}
            </div>
            {/* <p className="flex justify-between border-b mb-3">
                <span className="font-semibold">Motorisation:</span> 2.2L TDCI
              </p>
              <p className="flex justify-between border-b mb-3">
                <span className="font-semibold">Energie:</span> Gasoil
              </p>
              <p className="flex justify-between border-b mb-3">
                <span className="font-semibold">Motorisation:</span> 2.2L TDCI
              </p>
            </div> */}
          </div>
          <div className="grid md:grid-cols-2 relative">
            <div className="card p-5 w-full md:w-[50%] md:absolute lg:static lg:w-full left-0 bottom-10">
              <div className="mb-5 flex justify-center space-x-10 font-bold tracking-widest">
                <div>Prix</div>
                <div>{car.price}€</div>
              </div>
              <Link href="/contact" className="flex justify-center">
                <button className="bg-[#EF7937] w-56 rounded-3xl font-bold p-2 text-black tracking-widest">
                  Des questions ?
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CarScreen;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;
  console.log('le slug: ', slug);

  await db.connect();
  const car = await Car.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      car: car ? db.convertDocToObj(car) : null,
    },
  };
}
