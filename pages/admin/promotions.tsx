/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
// import { toast } from 'react-toastify';
import AdminSideMenu from '../../components/AdminSideMenu';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        promotions: action.payload,
        error: '',
      };
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
export default function AdminPromotionsScreen() {
  // const router = useRouter();

  const [
    {
      loading,
      error,
      promotions,
      // loadingCreate,
      successDelete,
      loadingDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    promotions: [],
    error: '',
  });

  // const createHandler = async () => {
  //   if (!window.confirm('Are you sure?')) {
  //     return;
  //   }
  //   try {
  //     dispatch({ type: 'CREATE_REQUEST' });
  //     const { data } = await axios.post(`/api/admin/promotions`);
  //     dispatch({ type: 'CREATE_SUCCESS' });
  //     toast.success('Promotion created successfully');
  //     router.push(`/admin/promotion/${data.promotion._id}`);
  //   } catch (err) {
  //     dispatch({ type: 'CREATE_FAIL' });
  //     toast.error(getError(err));
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/promotions`);
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

  // const deleteHandler = async (promotionId: any) => {
  //   if (!window.confirm('Are you sure?')) {
  //     return;
  //   }
  //   try {
  //     dispatch({ type: 'DELETE_REQUEST' });
  //     await axios.delete(`/api/admin/promotions/${promotionId}`);
  //     dispatch({ type: 'DELETE_SUCCESS' });
  //     toast.success('Promotion deleted successfully');
  //   } catch (err) {
  //     dispatch({ type: 'DELETE_FAIL' });
  //     toast.error(getError(err));
  //   }
  // };

  return (
    <Layout title="Admin Promotions">
      <div className="grid md:grid-cols-4 md:gap-5 mb-20">
        <AdminSideMenu title="Promotions" />
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Promotion(s)</h1>
            {loadingDelete && <div>Deleting item...</div>}
            {/* <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="primary-button"
            >
              {loadingCreate ? 'Loading' : 'Ajouter une Promotion'}
            </button> */}
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
                    {/* <th className="p-5 text-center"></th> */}
                    {/* <th className="p-5 text-left">ID</th> */}
                    <th className="p-5 text-left">NOM</th>
                    <th className="px-5 text-left">TITRE</th>
                    <th className="p-5 text-left">CATEGORIE</th>
                    <th className="p-5 text-left">SERVICE</th>
                    <th className="p-5 text-left">REDUCTION</th>
                  </tr>
                </thead>
                <tbody>
                  {promotions
                    .sort(function compare(a: any, b: any) {
                      if (a.cratedAt > b.createdAt) return -1;
                      if (a.createdAt < b.createdAt) return 1;
                      return 0;
                    })
                    .map((promotion: any) => (
                      <tr key={promotion._id} className="border-b">
                        {/* <td className=" p-5 flex items-center w-36">
                          <img
                            src={promotion.image}
                            alt={`${promotion.brand} ${promotion.model}`}
                            className="rounded-full w-full"
                          />
                        </td> */}
                        {/* <td className=" p-5 ">
                          {promotion._id.substring(20, 24)}
                        </td> */}
                        <td className=" p-5 ">{promotion.name}</td>
                        <td className=" p-5 ">{promotion.serviceTitle}</td>
                        <td className=" p-5 ">{promotion.serviceActivity}</td>
                        <td className=" p-5 ">{promotion.serviceName}</td>
                        <td className=" p-5">
                          <div className="bg-[#2f2f47] rounded-full p-3 text-center text-white w-24">
                            {promotion.reduction} %
                          </div>
                        </td>
                        <td className=" p-5 ">
                          <Link
                            href={`/admin/promotion/${promotion._id}`}
                            type="button"
                            className="default-button mr-5 text-blue-500 hover:text-blue-700 active:text-blue-900"
                          >
                            Modifier
                          </Link>
                          {/* &nbsp;
                          <button
                            onClick={() => deleteHandler(promotion._id)}
                            className="default-button text-blue-500 hover:text-blue-700 active:text-blue-900"
                            type="button"
                          >
                            Supprimer
                          </button> */}
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

AdminPromotionsScreen.auth = { adminOnly: true };
