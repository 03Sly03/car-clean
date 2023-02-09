/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import AdminSideMenu from '../../components/AdminSideMenu';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, cars: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminCarsScreen() {
  const router = useRouter();

  const [
    { loading, error, cars, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    cars: [],
    error: '',
  });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/cars`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Car created successfully');
      router.push(`/admin/car/${data.car._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/cars`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (carId: any) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/cars/${carId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Car deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Admin Cars">
      <div className="grid md:grid-cols-4 md:gap-5 mb-20">
        <AdminSideMenu title="Véhicules" />
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Véhicules</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="primary-button"
            >
              {loadingCreate ? 'Loading' : 'Ajouter un véhicule'}
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="table w-full mt-10">
                <div className="table-header-group">
                  <div className="table-row font-bold">
                    <div className="table-cell text-left border-b p-3 sm:p-5"></div>
                    <div className="hidden xs:table-cell text-center border-b p-3 sm:p-5">
                      CATEGORY
                    </div>
                    <div className="hidden xl:table-cell text-left border-b p-5">
                      ID
                    </div>
                    <div className="hidden sm:table-cell text-center border-b p-3 sm:p-5">
                      PRIX
                    </div>
                    <div className="hidden sm:table-cell text-left border-b p-5">
                      MARQUE & MODELE
                    </div>
                    <div className="hidden lg:table-cell text-left border-b p-5">
                      KILOMETRAGE
                    </div>
                    <div className="table-cell text-center xs:text-left border-b p-3 sm:p-5">
                      ACTIONS
                    </div>
                  </div>
                </div>
                <div className="table-row-group">
                  {cars
                    .sort(function compare(a: any, b: any) {
                      if (a.cratedAt > b.createdAt) return -1;
                      if (a.createdAt < b.createdAt) return 1;
                      return 0;
                    })
                    .map((car: any) => (
                      <div key={car._id} className="table-row">
                        <div className="table-cell w-36 pt-3 border-b">
                          <div className="text-center my-3 sm:hidden">
                            <p className="ml-3">{car.price} €</p>
                          </div>
                          <img
                            src={car.images[0]}
                            alt={`${car.brand} ${car.model}`}
                            className="rounded-full w-full"
                          />
                          <p className="text-xs text-center mt-2">{car.year}</p>
                          <div className="text-xs text-center my-3">
                            <p className="sm:hidden">{car.brand}</p>
                            <p className="sm:hidden">{car.model}</p>
                          </div>
                        </div>
                        <div className="hidden xs:table-cell p-3 sm:p-5 align-middle border-b text-center">
                          {car.category}
                        </div>
                        <div className="hidden xl:table-cell border-b p-5 align-middle">
                          {car._id.substring(20, 24)}
                        </div>
                        <div className="hidden sm:table-cell border-b p-5 align-middle">
                          <div className="bg-[#2f2f47] rounded-full p-2 text-sm lg:text-lg text-center text-white w-full">
                            {car.price}€
                          </div>
                        </div>
                        <div className="hidden sm:table-cell align-middle p-5 border-b text-center">
                          <p className="font-semibold">
                            {car.brand.toUpperCase()}
                          </p>
                          <p>{car.model}</p>
                        </div>
                        <div className="hidden lg:table-cell border-b p-5 align-middle">
                          {car.mileage} km
                        </div>
                        <div className="table-cell border-b align-middle p-3 sm:p-5 text-center xs:text-left">
                          <div>
                            <Link
                              href={`/admin/car/${car._id}`}
                              type="button"
                              className="default-button mr-5 text-blue-500 hover:text-blue-700 active:text-blue-900"
                            >
                              Modifier
                            </Link>
                            &nbsp;
                            <button
                              onClick={() => deleteHandler(car._id)}
                              className="default-button text-blue-500 hover:text-blue-700 active:text-blue-900"
                              type="button"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminCarsScreen.auth = { adminOnly: true };
