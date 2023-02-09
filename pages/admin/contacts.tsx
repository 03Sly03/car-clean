import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import AdminSideMenu from '../../components/AdminSideMenu';
import Layout from '../../components/Layout';
import { UserData } from '../../src/types/datas';
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
  const [users, setUsers] = useState<UserData[]>([]);
  const [{ loading, error, contacts, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      contacts: [],
      error: '',
    });

  useEffect(() => {
    const usersData = async () => {
      const { data } = await axios.get(`/api/admin/users`);
      setUsers(data);
    };
    usersData();
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

  const usersMail = users.map((user) => user.email);

  return (
    <Layout title="Contacts">
      <div className="grid md:grid-cols-4 md:gap-5 mb-20">
        <AdminSideMenu title="Contacts" />
        <div className="overflow-x-auto md:col-span-4 md:ml-52">
          <div className="flex justify-between">
            <h1 className="mb-4 text-3xl font-bold">Contacts</h1>
            {loadingDelete && <div>Deleting...</div>}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <h2 className="font-bold text-lg pb-5 my-10 border-b-2 border-black">
                MESSAGES
              </h2>
              {contacts
                .sort(function compare(a: any, b: any) {
                  if (a.cratedAt > b.createdAt) return -1;
                  if (a.createdAt < b.createdAt) return 1;
                  return 0;
                })
                .map((contact: any) => (
                  <div
                    key={contact._id}
                    className="border-b-2 border-black mb-10"
                  >
                    <div className="lg:flex justify-around mb-5">
                      <div className="flex mb-2">
                        <p className="mr-3">De la part de :</p>
                        <div>
                          <p className="font-semibold">{contact.name}</p>
                          <p className="text-sm">
                            ID: {contact._id.substring(20, 24)}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex mb-2 p-3 border ${
                          usersMail.find((email) => email === contact.email)
                            ? 'bg-green-100'
                            : ''
                        }`}
                      >
                        <p className="mr-3">Status:</p>
                        <div className="font-semibold">
                          <>
                            {usersMail.find((email) => email === contact.email)
                              ? 'inscris'
                              : 'non inscris'}
                          </>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        <p className="mr-3">Adresse mail:</p>
                        <div className="font-semibold">
                          <p>{contact.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-center items-center">
                      <div className="border xs:w-[80%] p-5 xs:p-10">
                        <h3 className="font-bold">Message(s)</h3>
                        {contact.contactMessage.map(
                          (message: string, index: number) => (
                            <div key={index} className="contactMessage">
                              <p className="mb-2 border-b p-3 text-justify">
                                {index + 1} - {message}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className=" p-3 my-5">
                      &nbsp;
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => deleteHandler(contact._id)}
                      >
                        Supprimer le(s) message(s) contact de{' '}
                        <span className="text-black text-lg font-semibold">
                          "{contact.name}"
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminContactsScreen;
