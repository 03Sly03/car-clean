import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
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
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
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

  return (
    <Layout title="Contact">
      {/* <div className="flex items-center justify-center">
        <UnderConstruction />
      </div> */}
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-2xl font-bold">Contactez nous</h1>
        <p className="mb-4">
          Vous avez une question ? N'hésitez pas à la poser ici !
        </p>
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
            value={session ? session.user.name : ''}
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
            value={session ? session.user.email : ''}
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
                message: 'Le message ne peut pas faire plus de 1000 caractères',
              },
            })}
          ></textarea>
          {errors.contactMessage && (
            <div className="text-red-500">{errors.contactMessage.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button type="submit" className="primary-button">
            Envoyer
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default ContactScreen;
