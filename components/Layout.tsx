import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
// import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Accueil', href: '/', current: true },
  { name: 'Contact', href: '#', current: false },
  { name: "Véhicules d'occasion", href: '/usedVehicles', current: false },
  { name: 'A propos', href: '#', current: false },
];

function classNames<T>(...classes: T[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

function Layout({ title, children }: Props) {
  // const { status, data: session } = useSession();

  return (
    <>
      <Head>
        <title>{title ? title + " - Car'Clean" : "Car'Clean"}</title>
        <meta
          name="description"
          content="Garge automobile et vente de véhicules d'occasion"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          {/* TEST NAV */}

          <Disclosure as="nav" className="bg-[#EF7937] mb-20">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative">
                  <div className="flex w-full justify-center absolute bottom-2 left-0">
                    <Link href="/">
                      <Image
                        className="block lg:hidden sm:hidden rounded-full"
                        src="/images/logos/logo.png"
                        alt="Car'Clean"
                        width={50}
                        height={50}
                      />
                    </Link>
                  </div>
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-[#2F2F47] hover:bg-[#2F2F47] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-center">
                      <div className="flex flex-shrink-0 items-center relative w-32">
                        <div className="absolute top-0 left-10">
                          <Link href="/">
                            <Image
                              className="hidden lg:block sm:block rounded-full"
                              src="/images/logos/logo.png"
                              alt="Car'Clean"
                              width={300}
                              height={300}
                            />
                          </Link>
                        </div>
                        <div className="absolute top-0 left-10">
                          <Link href="/">
                            <Image
                              className="hidden lg:block rounded-full"
                              src="/images/logos/logo.png"
                              alt="Car'Clean"
                              width={300}
                              height={300}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'text-[#2F2F47] font-extrabold'
                                  : 'text-[#2f2f47] font-semibold hover:text-white',
                                'px-3 py-2'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <Link href="https://fr-fr.facebook.com" target="_blank">
                        <Image
                          src="/images/logos/fbSvg.svg"
                          alt="logo facebook"
                          width={60}
                          height={60}
                        ></Image>
                      </Link>
                      {/* <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}
                      <p className="text-[#2f2f47] font-semibold">Romuald</p>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              src="/images/avatars/mustang.jpg"
                              alt=""
                              width={100}
                              height={100}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Settings
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* END TEST NAV */}

          {/* <nav className="flex h-16 items-center px-4 justify-between shadow-md bg-[#EF7937] mb-24">
            <div className="relative w-28 h-28">
              <Link
                href="/"
                className="text-lg font-bold absolute top-10 left-5"
              >
                <Image
                  className="rounded-full"
                  src="/images/logos/logo.png"
                  alt="logo spiquick"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="flex space-x-16 items-center text-lg font-bold">
              <div>
                <Link href="/home">Accueil</Link>
              </div>
              <div>
                <Link href="/home">Contact</Link>
              </div>
              <Link href="/home">Maintenance</Link>
              <Link href="/home">Véhicules d'occasion</Link>
              <Link href="/home">A propos</Link>
              <Link href="https://fr-fr.facebook.com" target="_blank">
                <Image
                  src="/images/logos/fbSvg.svg"
                  alt="logo facebook"
                  width={60}
                  height={60}
                ></Image>
              </Link>
            </div>
            <div>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-500">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="bg-white absolute right-0 w-56 origin-top-right shadow-lg">
                    <Menu.Item>
                      <DropdownLink href="/profile">Profile</DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink href="/profile">
                        Historique des commandes
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="#">Se déconnecter</Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link
                  className="p-2 text-blue-600 hover:text-blue-800"
                  href="/login"
                >
                  Se connecter
                </Link>
              )}
            </div>
          </nav> */}
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-20 justify-center items-center shadow-inner bg-[#2f2f47] text-white">
          <Link href="https://fr-fr.facebook.com" target="_blank">
            <Image
              src="/images/logos/fbSvg.svg"
              alt="logo facebook"
              width={60}
              height={60}
            ></Image>
          </Link>
          <p className="text-sm">
            Copyright © 2022 Car'Clean - WebSite made by{' '}
            <strong>SlyDevWeb</strong>
          </p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
