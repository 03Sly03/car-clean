/* eslint-disable @next/next/no-img-element */
// import { Listbox } from '@headlessui/react';
// import { CheckIcon } from '@heroicons/react/24/outline';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { CarData } from '../../../src/types/datas';
import { getError } from '../../../utils/error';

// const thingToSelect: any = [
//   { id: 0, name: 'Select a person', unavailable: true },
//   { id: 1, name: 'Duncan', unavailable: false },
//   { id: 2, name: 'Kenth', unavailable: false },
//   { id: 3, name: 'Therese', unavailable: false },
//   { id: 4, name: 'Benedict', unavailable: true },
//   { id: 5, name: 'Kate', unavailable: false },
// ];

function deleteEnterKeyAction(event: any) {
  // Compatibilité IE / Firefox
  if (!event && window.event) {
    event = window.event;
  }
  // IE
  if (event.keyCode == 13) {
    event.returnValue = false;
    event.cancelBubble = true;
  }
  // DOM
  if (event.which == 13) {
    event.preventDefault();
    event.stopPropagation();
  }
}

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
    getValues,
  } = useForm<CarData>();

  const categories = [
    { name: 'Aucune', unavailable: true },
    { name: 'Berline', unavailable: false },
    { name: 'Citadine', unavailable: false },
    { name: 'Crossover', unavailable: false },
    { name: 'Sportive', unavailable: false },
    { name: 'Utilitaire', unavailable: false },
  ];

  const [selected, setSelected] = useState(categories[0]);

  const [multipleImages, setMultipleImages] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/cars/${carId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('category', data.category === 'Aucune' ? '' : data.category);
        setValue('slug', data.slug);
        setValue(
          'images',
          data.images[0] === '/images/cars/car.webp' ? [] : data.images
        );
        setValue('brand', data.brand);
        setValue('model', data.model);
        setValue('year', data.year);
        setValue('mileage', data.mileage);
        setValue('description', data.description);
        setValue('price', data.price);
        setValue('features', data.features);

        setMultipleImages(
          data.images[0] === '/images/cars/car.webp' ? [] : data.images
        );
        setSelected({
          name: getValues('category') === '' ? 'Aucune' : getValues('category'),
          unavailable: true,
        });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [carId, getValues, setValue]);

  const router = useRouter();

  const uploadHandler = async (e: any, imageField: any = 'images') => {
    let imagesArray: any = multipleImages;
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const fileArray = e.target.files;
      for (const key of Object.keys(fileArray)) {
        const {
          data: { signature, timestamp },
        } = await axios('/api/admin/cloudinary-sign');

        const file = fileArray[key];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        const { data } = await axios.post(url, formData);
        setValue(imageField, data.secure_url);
        imagesArray.push(data.secure_url);
        setMultipleImages(imagesArray);
        setValue('images', imagesArray);
      }

      // const file = e.target.files[0];
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('signature', signature);
      // formData.append('timestamp', timestamp);
      // formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      // const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('File(s) uploaded successfully');
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
    features,
  }) => {
    if (images.length === 0) {
      return;
    }
    if (category === 'Aucune' || category === '') {
      return;
    }
    if (brand !== 'N/C' && model !== 'N/C') {
      if (slug.substring(0, 3) === 'car') {
        slug = slug.replace(
          'car',
          `${brand.split(' ').join('').toLowerCase()}-${model
            .split(' ')
            .join('')
            .toLowerCase()}`
        );
      }
    }
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
        features,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Car updated successfully');
      router.push('/admin/cars');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const handleDelete = async (e: any, indexCarId: any) => {
    e.preventDefault();
    const arrayafterDelete = multipleImages.filter(
      (image: string) => image !== multipleImages[+indexCarId]
    );
    setMultipleImages(arrayafterDelete);
    setValue('images', arrayafterDelete);
  };

  return (
    <Layout title={`Edit Car ${carId}`}>
      <div className="mb-10">
        <Link
          href="/admin/cars"
          className="font-extrabold bg-[#2F2F47] text-white p-3 rounded-xl"
        >
          Retour sans enregistrer
        </Link>
      </div>
      <div className="grid grid-cols-1 mb-20">
        {/* <div>
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
        </div> */}
        {/* <div className="md:col-span-3"> */}
        {/* <div className="mb-16 grid grid-cols-1"> */}
        {/* </div> */}
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
            {/* <div className="mb-4">
              <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                <Listbox.Button className="p-2 border">
                  {selectedPerson.name}
                </Listbox.Button>
                <Listbox.Options className="p-4 mb-20 shadow-lg">
                  {thingToSelect.map((person: any) => (
                    <Listbox.Option
                      key={person.id}
                      value={person}
                      disabled={person.unavailable}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          className={`${
                            active
                              ? 'bg-blue-500 text-white border-b mb-2 p-2'
                              : 'bg-white text-black border-b mb-2 p-2'
                          }`}
                        >
                          {selected && (
                            <span className="absolute right-10">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                          {person.name}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
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
            </div> */}
            <div className="mb-5">
              <Listbox value={selected} onChange={setSelected}>
                <Listbox.Label>Categorie</Listbox.Label>
                <div className="relative mt-1 grid sm:grid-cols-4">
                  <Listbox.Button
                    className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
                      errors.category &&
                      'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    id="category"
                    value={selected.name === 'Aucune' ? '' : selected.name}
                    autoFocus
                    {...register('category', {
                      required: 'Veuillez selectionner une catégorie',
                    })}
                  >
                    <span className="block truncate">{selected.name}</span>
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {categories.map((category, categoryIdx) => (
                        <Listbox.Option
                          disabled={category.unavailable}
                          key={categoryIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-gray-100 text-amber-900'
                                : 'text-gray-500'
                            }`
                          }
                          value={category}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {category.name}
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
              {errors.category && (
                <div className="text-red-500">{errors.category.message}</div>
              )}
            </div>
            {/* <div className="mb-4">
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
            </div> */}
            <div
              className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10"
              id="images"
              {...register('images', {
                required: 'Selectionnez au moins une image',
              })}
            >
              {multipleImages.map((image: string, index: number) => (
                <div key={index} className="mb-4">
                  <img
                    id={'carImageId' + index}
                    src={image}
                    alt={getValues('brand') + ' ' + getValues('model')}
                  />
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, index)}
                    className="w-full p-2 border-2 border-white text-center text-white bg-red-600"
                  >
                    Supprimer
                  </button>
                  {loadingUpload && (
                    <div className="flex justify-center items-center bg-gray-100 h-48">
                      Uploading....
                    </div>
                  )}
                  {/* <label htmlFor="images">...</label>
                  <input
                    type="text"
                    className="w-full"
                    id="images"
                    {...register('images', {
                      required: 'Please enter images',
                    })}
                  /> */}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label htmlFor="imagesFile">Upload images</label>
              <input
                type="file"
                className={`w-full ${
                  errors.category &&
                  'focus:border-red-500 focus:ring-red-500 border-red-500'
                }`}
                id="imagesFile"
                multiple
                onChange={uploadHandler}
              />
              {errors.images && (
                <div className="text-red-500">{errors.images.message}</div>
              )}
              {loadingUpload && <div>Uploading....</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="brand">brand</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
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
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="model"
                {...register('model', {
                  required: 'Please enter model',
                })}
              />
              {errors.model && (
                <div className="text-red-500">{errors.model.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="energy">Energie</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="energy"
                {...register('features.energy')}
              />
              {errors.features?.energy && (
                <div className="text-red-500">
                  {errors.features.energy.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="motorisation">Motorisation</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="motorisation"
                {...register('features.motorisation')}
              />
              {errors.features?.motorisation && (
                <div className="text-red-500">
                  {errors.features.motorisation.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="gearbox">Boîte à vitesse</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="gearbox"
                {...register('features.gearbox')}
              />
              {errors.features?.gearbox && (
                <div className="text-red-500">
                  {errors.features.gearbox.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="guarantee">Garantie</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="guarantee"
                {...register('features.guarantee')}
              />
              {errors.features?.guarantee && (
                <div className="text-red-500">
                  {errors.features.guarantee.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="taxHorsePower">Puissance fiscale</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="taxHorsePower"
                {...register('features.taxHorsePower')}
              />
              {errors.features?.taxHorsePower && (
                <div className="text-red-500">
                  {errors.features.taxHorsePower.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="dinHorses">Puissance (DIN)</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="dinHorses"
                {...register('features.dinHorses')}
              />
              {errors.features?.dinHorses && (
                <div className="text-red-500">
                  {errors.features.dinHorses.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="numberOfDoors">Nombre de portes</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="numberOfDoors"
                {...register('features.numberOfDoors')}
              />
              {errors.features?.numberOfDoors && (
                <div className="text-red-500">
                  {errors.features.numberOfDoors.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="numberOfPlaces">Nombre de places</label>
              <input
                onKeyPress={(event) => deleteEnterKeyAction(event)}
                type="text"
                className="w-full"
                id="numberOfPlaces"
                {...register('features.numberOfPlaces')}
              />
              {errors.features?.numberOfPlaces && (
                <div className="text-red-500">
                  {errors.features.numberOfPlaces.message}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="mb-4 flex flex-col">
                <label htmlFor="year">Année</label>
                <input
                  onKeyPress={(event) => deleteEnterKeyAction(event)}
                  type="number"
                  className="text-lg"
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
                  onKeyPress={(event) => deleteEnterKeyAction(event)}
                  type="number"
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
            </div>
            <div className="mb-4">
              <label htmlFor="description">description</label>
              <textarea
                rows={4}
                className="w-full"
                id="description"
                {...register('description', {
                  required: 'Please enter description',
                })}
              ></textarea>
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="mb-4">
                <label htmlFor="price">Tarif</label>

                <input
                  onKeyPress={(event) => deleteEnterKeyAction(event)}
                  type="number"
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
            </div>
            <div className="mb-4">
              <button
                type="submit"
                disabled={loadingUpdate}
                className="primary-button"
              >
                {loadingUpdate ? 'Loading' : 'Update'}
              </button>
            </div>
          </form>
        )}
        {/* </div> */}
      </div>
    </Layout>
  );
}

AdminCarEditScreen.auth = { adminOnly: true };
