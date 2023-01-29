import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, contacts: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

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

function AdminContactsScreen() {
  const [{ loading, error, contacts, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      contacts: [],
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/contacts`);
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

  const deleteHandler = async (contactId: any) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/contacts/${contactId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Contact deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Contacts">
      <div className="grid md:grid-cols-4 md:gap-5 mb-20">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Tableau de bord</Link>
            </li>
            <li>
              <Link href="/admin/cars">Véhicules</Link>
            </li>
            <li>
              <Link href="/admin/users">Utilisateurs</Link>
            </li>
            <li>
              <Link href="/admin/contacts" className="font-bold">
                Contacts
              </Link>
            </li>
          </ul>
        </div>

        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Utilisateurs</h1>
            {loadingDelete && <div>Deleting...</div>}
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
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">NOM</th>
                    <th className="p-5 text-left">EMAIL</th>
                    <th className="p-5 text-left">MESSAGE</th>
                    <th className="p-5 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact: any) => (
                    <tr key={contact._id} className="border-b">
                      <td className=" p-5 align-text-top">
                        {contact._id.substring(20, 24)}
                      </td>
                      <td className=" p-5 align-text-top">{contact.name}</td>
                      <td className=" p-5 align-text-top">{contact.email}</td>
                      <td className=" p-5 align-text-top">
                        {contact.contactMessage.map(
                          (message: string, index: number) => (
                            <div key={index} className="contactMessage">
                              <p className="mb-2 border-b p-3 text-justify">
                                {index + 1} - {message}
                              </p>
                            </div>
                          )
                        )}
                      </td>
                      <td className=" p-5">
                        &nbsp;
                        <button
                          type="button"
                          className="default-button text-blue-500 hover:text-blue-700 active:text-blue-900"
                          onClick={() => deleteHandler(contact._id)}
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

export default AdminContactsScreen;
