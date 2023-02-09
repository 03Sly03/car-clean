import Link from 'next/link';
import React from 'react';

const navigation = [
  { name: 'Tableau de bord', href: '/admin/dashboard', current: false },
  { name: 'Véhicules', href: '/admin/cars', current: false },
  { name: 'Utilisateurs', href: '/admin/users', current: false },
  { name: 'Contacts', href: '/admin/contacts', current: false },
  { name: 'Promotions', href: '/admin/promotions', current: false },
];

function classNames<T>(...classes: T[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  title: string;
};

function AdminSideMenu({ title }: Props) {
  navigation.filter((page) =>
    title === page.name ? (page.current = true) : (page.current = false)
  );

  return (
    <div className="mb-10">
      <ul className="p-5 flex flex-col shadow-lg text-center space-y-5 md:w-44 lg:w-48 md:text-left">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={classNames(
                item.current
                  ? 'text-[#2F2F47] font-extrabold underline underline-offset-8'
                  : 'text-[#2f2f47] font-semibold hover:font-bold',
                'md:px-2 lg:px-3 py-2 md:text-sm lg:text-base'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSideMenu;
