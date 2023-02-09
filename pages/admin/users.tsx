import axios from 'axios';
import Link from 'next/link';
// import { useRouter } from 'next/router';
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
      return { ...state, loading: false, users: action.payload, error: '' };
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
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId: any) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('User deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Admin Users">
      <div className="grid md:grid-cols-4 md:gap-5 mb-20">
        <AdminSideMenu title="Utilisateurs" />
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Utilisateurs</h1>
            {loadingDelete && <div>Deleting...</div>}
            <Link href="/admin/user/register" className="primary-button">
              Ajouter un utilisateur
            </Link>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="table min-w-full mt-10">
                <div className="table-header-group">
                  <div className="table-row font-bold">
                    <div className="hidden lg:table-cell px-5 text-left">
                      ID
                    </div>
                    <div className="hidden sm:table-cell p-5 text-left">
                      NOM
                    </div>
                    <div className="table-cell p-5 text-left sm:hidden">
                      NOM & EMAIL
                    </div>
                    <div className="hidden sm:table-cell p-5 text-left">
                      EMAIL
                    </div>
                    <div className="hidden xs:table-cell p-5 text-center">
                      ADMIN
                    </div>
                    <div className="table-cell p-5 text-left">ACTIONS</div>
                  </div>
                </div>
                <div className="table-row-group">
                  {users
                    .sort(function compare(a: any, b: any) {
                      if (a.cratedAt > b.createdAt) return -1;
                      if (a.createdAt < b.createdAt) return 1;
                      return 0;
                    })
                    .map((user: any) => (
                      <div key={user._id} className="table-row">
                        <div className="hidden lg:table-cell border-b p-5 ">
                          {user._id.substring(20, 24)}
                        </div>
                        <div className="hidden sm:table-cell border-b p-5 ">
                          {user.name}
                        </div>
                        <div className="table-cell border-b p-5 ">
                          <p className="sm:hidden">{user.name}</p>
                          <div className="w-28 xs:w-32 sm:w-full overflow-x-auto">
                            {user.email}
                          </div>
                          <p className="text-xs mt-3 lg:hidden">
                            ID: {user._id.substring(20, 24)}
                          </p>
                        </div>
                        <div className="hidden xs:table-cell border-b p-5 text-center">
                          {user.isAdmin ? 'YES' : 'NO'}
                        </div>
                        <div className="table-cell border-b p-5 ">
                          <Link
                            href={`/admin/user/${user._id}`}
                            passHref
                            type="button"
                            className="default-button mr-5 text-blue-500 hover:text-blue-700 active:text-blue-900"
                          >
                            Modifier
                          </Link>
                          &nbsp;
                          <button
                            type="button"
                            className="default-button text-blue-500 hover:text-blue-700 active:text-blue-900"
                            onClick={() => deleteHandler(user._id)}
                          >
                            Supprimer
                          </button>
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
