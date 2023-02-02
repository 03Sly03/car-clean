import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { CarData } from '../../../src/types/datas';
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
export default function AdminCarEditScreen() {
  const { query } = useRouter();
  const carId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CarData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/cars/${carId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('category', data.category);
        setValue('slug', data.slug);
        setValue('images', data.images);
        setValue('brand', data.brand);
        setValue('model', data.model);
        setValue('year', data.year);
        setValue('mileage', data.mileage);
        setValue('description', data.description);
        setValue('price', data.price);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [carId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e: any, imageField: any = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const { data } = await axios.post(url, formData);
      console.log('le data: ', data);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler: SubmitHandler<CarData> = async ({
    category,
    slug,
    images,
    brand,
    model,
    year,
    mileage,
    description,
    price,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/cars/${carId}`, {
        category,
        slug,
        images,
        brand,
        model,
        year,
        mileage,
        description,
        price,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Car updated successfully');
      router.push('/admin/cars');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Car ${carId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/cars" className="font-bold">
                Véhicules
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
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
              <h1 className="mb-4 text-xl">{`Edit Car ${carId}`}</h1>
              <div className="mb-4">
                <label htmlFor="category">category</label>
                <input
                  type="text"
                  className="w-full"
                  id="category"
                  {...register('category', {
                    required: 'Please enter category',
                  })}
                />
                {errors.category && (
                  <div className="text-red-500">{errors.category.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="w-full"
                  id="slug"
                  {...register('slug', {
                    required: 'Please enter slug',
                  })}
                />
                {errors.slug && (
                  <div className="text-red-500">{errors.slug.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="image">image</label>
                <input
                  type="text"
                  className="w-full"
                  id="image"
                  {...register('images', {
                    required: 'Please enter image',
                  })}
                />
                {errors.images && (
                  <div className="text-red-500">{errors.images.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageFile">Upload image</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="brand">brand</label>
                <input
                  type="text"
                  className="w-full"
                  id="brand"
                  {...register('brand', {
                    required: 'Please enter brand',
                  })}
                />
                {errors.brand && (
                  <div className="text-red-500">{errors.brand.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="model">Modèle</label>
                <input
                  type="text"
                  className="w-full"
                  id="model"
                  autoFocus
                  {...register('model', {
                    required: 'Please enter model',
                  })}
                />
                {errors.model && (
                  <div className="text-red-500">{errors.model.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="year">Année</label>
                <input
                  type="text"
                  className="w-full"
                  id="year"
                  {...register('year', {
                    required: 'Please enter year',
                  })}
                />
                {errors.year && (
                  <div className="text-red-500">{errors.year.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="mileage">Kilométrage</label>
                <input
                  type="text"
                  className="w-full"
                  id="mileage"
                  {...register('mileage', {
                    required: 'Please enter mileage',
                  })}
                />
                {errors.mileage && (
                  <div className="text-red-500">{errors.mileage.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description">description</label>
                <input
                  type="text"
                  className="w-full"
                  id="description"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="price"
                  {...register('price', {
                    required: 'Please enter price',
                  })}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>
              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/cars`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminCarEditScreen.auth = { adminOnly: true };
