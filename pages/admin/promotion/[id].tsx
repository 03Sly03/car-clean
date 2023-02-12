import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { PromotionData } from '../../../src/types/datas';
import data from '../../../utils/data';
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
    getValues,
  } = useForm<PromotionData>();

  const [selectedActivity, setSelectedActivity] = useState<any>(
    data.activities[0]
  );
  const [selectedWork, setSelectedWork] = useState(selectedActivity.works[0]);
  const [selectedProduct, setSelectedProduct] = useState(
    selectedWork.products[0]
  );

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

        setSelectedActivity({
          title: getValues('serviceTitle'),
          slug: getValues('serviceSlug'),
          works: [
            {
              activity: getValues('serviceTitle'),
              name: getValues('serviceActivity'),
              products: [
                {
                  workName: getValues('serviceActivity'),
                  name: getValues('serviceName'),
                },
              ],
            },
          ],
        });
        setSelectedWork({
          activity: getValues('serviceTitle'),
          name: getValues('serviceActivity'),
          products: [
            {
              workName: getValues('serviceActivity'),
              name: getValues('serviceName'),
            },
          ],
        });
        setSelectedProduct({
          workName: getValues('serviceActivity'),
          name: getValues('serviceName'),
        });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [getValues, promotionId, setValue]);

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
    serviceSlug = selectedActivity.slug;
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

  console.log('le selectedActivity.title: ', selectedActivity.title);
  console.log('le selectedWork.name: ', selectedWork.name);
  console.log('le selectedProduct.name: ', selectedProduct.name);

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
                  disabled={true}
                  type="text"
                  className="w-full"
                  id="serviceSlug"
                  value={selectedActivity.slug}
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
              {/* <div className="mb-4">
                <label htmlFor="serviceTitle">Activitée</label>
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
              </div> */}

              <div className="mb-5">
                <Listbox
                  value={selectedActivity}
                  onChange={setSelectedActivity}
                >
                  <Listbox.Label>Activitée</Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
                        errors.serviceTitle &&
                        'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      id="category"
                      value={
                        selectedActivity.title === 'Sélectionnez une activitée'
                          ? ''
                          : selectedActivity.title
                      }
                      {...register('serviceTitle', {
                        required: 'Veuillez selectionner une activitée',
                      })}
                    >
                      <span className="block truncate">
                        {selectedActivity.title}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="z-10 absolute mt-1 max-h-64 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {data.activities.map(
                          (activity: any, activityIdx: number) => (
                            <Listbox.Option
                              key={activityIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-gray-100 text-amber-900'
                                    : 'text-gray-500'
                                }`
                              }
                              value={activity}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {activity.title}
                                  </span>
                                  {selected ? (
                                    <span className="z-0 absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          )
                        )}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                {errors.serviceTitle && (
                  <div className="text-red-500">
                    {errors.serviceTitle.message}
                  </div>
                )}
              </div>

              {/* <div className="mb-4">
                <label htmlFor="serviceActivity">Travail</label>
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
              </div> */}

              <div className="mb-5">
                <Listbox value={selectedWork} onChange={setSelectedWork}>
                  <Listbox.Label>Travail</Listbox.Label>
                  <div className="relative mt-1 grid sm:grid-cols-4">
                    <Listbox.Button
                      className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
                        errors.serviceActivity &&
                        'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      id="serviceActivity"
                      value={
                        selectedWork.name ===
                          'Sélectionnez un travail à effectuer' ||
                        selectedActivity.title !== selectedWork.activity
                          ? ''
                          : selectedWork.name
                      }
                      {...register('serviceActivity', {
                        required: 'Sélectionnez un travail à effectuer',
                      })}
                    >
                      <span className="block truncate">
                        {selectedActivity.title ===
                          'Sélectionnez une activitée' ||
                        selectedActivity.title !== selectedWork.activity
                          ? 'Sélectionnez un travail à effectuer'
                          : selectedWork.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {selectedActivity.works
                          .sort(function compare(a: any, b: any) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                          })
                          .map((work: any, workIdx: number) => (
                            <Listbox.Option
                              key={workIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-gray-100 text-amber-900'
                                    : 'text-gray-500'
                                }`
                              }
                              value={work}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {work.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                {errors.serviceActivity && (
                  <div className="text-red-500">
                    {errors.serviceActivity.message}
                  </div>
                )}
              </div>

              {/* <div className="mb-4">
                <label htmlFor="serviceName">Produit</label>
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
              </div> */}

              <div className="mb-5">
                <Listbox value={selectedProduct} onChange={setSelectedProduct}>
                  <Listbox.Label>Produit</Listbox.Label>
                  <div className="relative mt-1 grid sm:grid-cols-4">
                    <Listbox.Button
                      className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
                        errors.serviceActivity &&
                        'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      id="serviceActivity"
                      value={
                        selectedProduct.name === 'Sélectionnez un produit' ||
                        selectedWork.name !== selectedProduct.workName
                          ? ''
                          : selectedProduct.name
                      }
                      {...register('serviceName', {
                        required: 'Sélectionnez un produit',
                      })}
                    >
                      <span className="block truncate">
                        {
                          selectedWork.name ===
                            'Sélectionnez un travail à effectuer' ||
                          selectedActivity.title !== selectedWork.activity ||
                          selectedWork.name !== selectedProduct.workName
                            ? 'Sélectionnez un travail à effectuer'
                            : selectedProduct.name
                          // selectedActivity.title === 'Sélectionnez une activitée'
                          //   ? 'Sélectionnez un travail à effectuer'
                          //   : selectedWork.name
                        }
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {(selectedActivity.title === selectedWork.activity ||
                        selectedWork.name === selectedProduct.workName
                          ? selectedWork.products
                          : []
                        )
                          .sort(function compare(a: any, b: any) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                          })
                          .map((procduct: any, procductIdx: number) => (
                            <Listbox.Option
                              key={procductIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-gray-100 text-amber-900'
                                    : 'text-gray-500'
                                }`
                              }
                              value={procduct}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {procduct.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                {errors.serviceName && (
                  <div className="text-red-500">
                    {errors.serviceName.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="reduction">Réduction</label>
                <input
                  type="number"
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
