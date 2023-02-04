import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { PromotionData } from '../../../src/types/datas';
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

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminPromotionEditScreen() {
  const { query } = useRouter();
  const promotionId = query.id;
  const [
    {
      loading,
      error,
      loadingUpdate,
      // loadingUpload
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PromotionData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `/api/admin/promotions/${promotionId}`
        );
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('serviceSlug', data.serviceSlug);
        setValue('serviceTitle', data.serviceTitle);
        setValue('serviceActivity', data.serviceActivity);
        setValue('serviceName', data.serviceName);
        setValue('reduction', data.reduction);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [promotionId, setValue]);

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

  const submitHandler: SubmitHandler<PromotionData> = async ({
    name,
    serviceSlug,
    serviceTitle,
    serviceActivity,
    serviceName,
    reduction,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/promotions/${promotionId}`, {
        name,
        serviceSlug,
        serviceTitle,
        serviceActivity,
        serviceName,
        reduction,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Promotion updated successfully');
      router.push('/admin/promotions');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Promotion ${promotionId}`}>
      <div className="mb-10">
        <Link
          href="/admin/promotions"
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
              <h1 className="mb-4 text-xl">{`Edit Promotion ${promotionId}`}</h1>
              <div className="mb-4">
                <label htmlFor="name">Nom de la promotion</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter category',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="serviceSlug">Service Slug</label>
                <input
                  type="text"
                  className="w-full"
                  id="serviceSlug"
                  {...register('serviceSlug', {
                    required: 'Please enter serviceSlug',
                  })}
                />
                {errors.serviceSlug && (
                  <div className="text-red-500">
                    {errors.serviceSlug.message}
                  </div>
                )}
              </div>
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
                <label htmlFor="serviceTitle">Titre</label>
                <input
                  type="text"
                  className="w-full"
                  id="serviceTitle"
                  {...register('serviceTitle', {
                    required: 'Please enter serviceTitle',
                  })}
                />
                {errors.serviceTitle && (
                  <div className="text-red-500">
                    {errors.serviceTitle.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="serviceActivity">Activitée</label>
                <input
                  type="text"
                  className="w-full"
                  id="serviceActivity"
                  {...register('serviceActivity', {
                    required: 'Please enter serviceActivity',
                  })}
                />
                {errors.serviceActivity && (
                  <div className="text-red-500">
                    {errors.serviceActivity.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="serviceName">Service</label>
                <input
                  type="text"
                  className="w-full"
                  id="serviceName"
                  {...register('serviceName', {
                    required: 'Please enter serviceName',
                  })}
                />
                {errors.serviceName && (
                  <div className="text-red-500">
                    {errors.serviceName.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="reduction">Réduction</label>
                <input
                  type="text"
                  className="w-full"
                  id="reduction"
                  {...register('reduction', {
                    required: 'Please enter reduction',
                  })}
                />
                {errors.reduction && (
                  <div className="text-red-500">{errors.reduction.message}</div>
                )}
              </div>

              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminPromotionEditScreen.auth = { adminOnly: true };
