import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { UserData } from '../../../src/types/datas';
import { getError } from '../../../utils/error';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    // case 'UPLOAD_REQUEST':
    //   return { ...state, loadingUpload: true, errorUpload: '' };
    // case 'UPLOAD_SUCCESS':
    //   return {
    //     ...state,
    //     loadingUpload: false,
    //     errorUpload: '',
    //   };
    // case 'UPLOAD_FAIL':
    //   return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminUserEditScreen() {
  const { query } = useRouter();
  const userId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<UserData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users/${userId}`);
        // console.log('le data fetch_request: ', data);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('image', data.image);
        setValue('isAdmin', data.isAdmin);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [userId, setValue]);

  // const isAdmin = getValues('isAdmin');
  const email = getValues('email');

  const router = useRouter();

  //   const uploadHandler = async (e: any, imageField: any = 'image') => {
  //     const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  //     try {
  //       dispatch({ type: 'UPLOAD_REQUEST' });
  //       const {
  //         data: { signature, timestamp },
  //       } = await axios('/api/admin/cloudinary-sign');

  //       const file = e.target.files[0];
  //       const formData = new FormData();
  //       formData.append('file', file);
  //       formData.append('signature', signature);
  //       formData.append('timestamp', timestamp);
  //       formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
  //       const { data } = await axios.post(url, formData);
  //       console.log('le data: ', data);
  //       dispatch({ type: 'UPLOAD_SUCCESS' });
  //       setValue(imageField, data.secure_url);
  //       toast.success('File uploaded successfully');
  //     } catch (err) {
  //       dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
  //       toast.error(getError(err));
  //     }
  //   };

  const submitHandler: SubmitHandler<UserData> = async ({
    name,
    email,
    image,
    isAdmin,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/users/${userId}`, {
        name,
        email,
        image,
        isAdmin,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('User updated successfully');
      router.push('/admin/users');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit User ${userId}`}>
      <div className="mb-10">
        <Link
          href="/admin/users"
          className="font-extrabold bg-[#2F2F47] text-white p-3 rounded-xl"
        >
          Retour sans enregistrer
        </Link>
      </div>
      <div className="grid mb-20">
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit User ${userId}`}</h1>

              <div className="mb-4">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
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
                <label htmlFor="email">Adresse mail</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Entrez une adresse mail',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Entrez une addresse mail valide',
                    },
                  })}
                  className="w-full"
                  id="email"
                ></input>
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              {/* <label htmlFor="isAdmin">Rôle d'administrateur ?</label>
                <input type="radio" name="question" value="oui" id="oui" />{' '}
                <label htmlFor="oui">oui</label>
                <input type="radio" name="question" value="non" id="non" />{' '}
              <label htmlFor="non">non</label> */}

              {email === 'admin@example.com' ? (
                <></>
              ) : (
                <div className="mb-4 flex flex-wrap space-x-3">
                  <label htmlFor="isAdmin">Rôle d'administrateur ?</label>
                  <input
                    type="checkbox"
                    {...register('isAdmin')}
                    id="isAdmin"
                  />
                  {errors.isAdmin && (
                    <div className="text-red-500">{errors.isAdmin.message}</div>
                  )}
                </div>
              )}

              {/* <div className="mb-4">
                <label htmlFor="image">image</label>
                <input
                  type="text"
                  className="w-full"
                  id="image"
                  {...register('image', {
                    required: 'Please enter image',
                  })}
                />
                {errors.image && (
                  <div className="text-red-500">{errors.image.message}</div>
                )}
              </div> */}
              {/* <div className="mb-4">
                <label htmlFor="imageFile">Upload image</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div> */}

              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Chargement' : 'Enregistrer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminUserEditScreen.auth = { adminOnly: true };
