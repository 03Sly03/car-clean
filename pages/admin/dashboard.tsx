import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import AdminSideMenu from '../../components/AdminSideMenu';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

// type TSummary = {
//   summary: {
//     salesData: [];
//     ordersPrice: number;
//     ordersCount: number;
//     productsCount: number;
//     usersCount: number;
//   };
// };

// type TAction = {
//   type: string;
//   payload: {
//     loading: boolean;
//     summary: TSummary;
//     error: string;
//   };
// };

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//   },
// };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action!.payload, error: '' };
    case 'FETCH_FAL':
      return { ...state, loading: false, error: action!.payload };
    default:
      state;
  }
};

function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  //   const data = {
  //     labels: summary.salesData.map((x: any) => x._id), // 2022/01 2022/03
  //     datasets: [
  //       {
  //         label: 'Ventes',
  //         backgroundColor: 'rgba(162, 222, 208, 1)',
  //         data: summary.salesData.map((x: any) => x.totalSales),
  //       },
  //     ],
  //   };

  return (
    <Layout title="Tableau de bord">
      <div className="grid  md:grid-cols-4 md:gap-5 mb-20">
        <AdminSideMenu title="Tableau de bord" />
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">Tableau de bord</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <Link href="/admin/cars">
                  <div className="card m-5 p-5">
                    <p className="text-3xl">{summary.carsCount} </p>
                    <p>Véhicule(s)</p>
                  </div>
                </Link>
                <Link href="/admin/users">
                  <div className="card m-5 p-5">
                    <p className="text-3xl">{summary.usersCount} </p>
                    <p>Utilisateur(s)</p>
                  </div>
                </Link>
                <Link href="/admin/contacts">
                  <div className="card m-5 p-5">
                    <p className="text-3xl">{summary.contactsCount} </p>
                    <p>Contact(s)</p>
                  </div>
                </Link>
                <Link href="/admin/promotions">
                  <div className="card m-5 p-5">
                    <p className="text-3xl">1</p>
                    <p>Promotion(s)</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboardScreen;

AdminDashboardScreen.auth = { adminOnly: true };
