/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
// import UnderConstruction from '../components/UnderConstruction';
import { getError } from '../utils/error';

type FormValues = {
  name: string;
  email: string;
  contactMessage: string;
};

function ContactScreen() {
  const router = useRouter();
  const { message } = router.query;

  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();

  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    email,
    contactMessage,
  }) => {
    try {
      await axios.post('/api/auth/contact', {
        name,
        email,
        contactMessage,
      });
      reset();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const usersSession = session?.user!;

  useEffect(() => {
    if (usersSession) {
      setValue('name', usersSession.name);
      setValue('email', usersSession.email);
    }
  }, [usersSession, setValue]);

  return (
    <Layout title="Contact">
      <div className="flex items-center justify-center space-x-20 mb-20">
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          {message ? (
            <>
              <p className="mb-4 font-semibold">{message}</p>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-2xl font-bold">Contactez nous</h1>
              <p className="mb-4">
                Vous avez une question ? N'hésitez pas à la poser ici !
              </p>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              className="w-full"
              autoFocus
              {...register('name', {
                required: 'Entrez votre nom',
              })}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Please enter email',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Please enter valid email',
                },
              })}
              className="w-full"
              id="email"
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name">Message</label>
            <textarea
              rows={4}
              id="contactMessage"
              className="w-full"
              placeholder="Tapez votre message ici..."
              {...register('contactMessage', {
                required: "N'oubliez pas de laisser votre message",
                maxLength: {
                  value: 1000,
                  message:
                    'Le message ne peut pas faire plus de 1000 caractères',
                },
              })}
            ></textarea>
            {errors.contactMessage && (
              <div className="text-red-500">
                {errors.contactMessage.message}
              </div>
            )}
          </div>
          <div className="mb-4 ">
            <button type="submit" className="primary-button">
              Envoyer
            </button>
          </div>
        </form>

        <div className="card-construction rounded-tl-[200px] rounded-br-[200px] relative">
          <img
            src="/images/underconstruction/image.avif"
            alt="Compte tour"
            className="absolute object-cover h-full w-full opacity-5 bottom-0 left-0 rounded-tl-[200px] rounded-br-[200px]"
          />
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
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.6627715245195!2d2.719946576153561!3d50.44738177159159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd3b0c44d1d769%3A0x25e0b24ee3e5dfc4!2s61%20Rue%20du%2018%20Novembre%201869%2C%2062160%20Bully-les-Mines!5e0!3m2!1sfr!2sfr!4v1675008142136!5m2!1sfr!2sfr"
          width="600"
          height="450"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-80 border-4 border-[#ef7937] rounded-3xl"
        ></iframe>
      </div>

      <p className="z-0 text-center my-20 text-2xl bg-[#ef7937] p-10 rounded-full">
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
    </Layout>
  );
}

export default ContactScreen;
