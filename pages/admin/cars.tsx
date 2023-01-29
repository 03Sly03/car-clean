/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
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
export default function AdminProdcutsScreen() {
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
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul className="p-5 m-2 block shadow-lg h-auto w-40 space-y-5">
            <li>
              <Link href="/admin/dashboard">Tableau de bord</Link>
            </li>
            <li>
              <Link href="/admin/cars" className="font-bold">
                Véhicules
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Utilisateurs</Link>
            </li>
          </ul>
        </div>
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
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-center"></th>
                    <th className="p-5 text-left">CATEGORY</th>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">MARQUE</th>
                    <th className="p-5 text-left">MODEL</th>
                    <th className="p-5 text-left">ANNEE</th>
                    <th className="p-5 text-left">KILOMETRAGE</th>
                    <th className="p-5 text-left">PRIX</th>
                    <th className="p-5 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car: any) => (
                    <tr key={car._id} className="border-b">
                      <td className=" p-5 flex items-center w-36">
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="rounded-full w-full"
                        />
                      </td>
                      <td className=" p-5 ">{car.category}</td>
                      <td className=" p-5 ">{car._id.substring(20, 24)}</td>
                      <td className=" p-5 ">{car.brand}</td>
                      <td className=" p-5 ">{car.model}</td>
                      <td className=" p-5 ">{car.year}</td>
                      <td className=" p-5 ">{car.mileage}</td>
                      <td className=" p-5">
                        <div className="bg-[#2f2f47] rounded-full p-3 text-center text-white w-24">
                          {car.price} €
                        </div>
                      </td>
                      <td className=" p-5 ">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProdcutsScreen.auth = { adminOnly: true };
