import Link from 'next/link';
import React from 'react';

const navigation = [
  { name: 'Maintenance', href: '/repair', current: false },
  {
    name: 'Recharge de climatisation',
    href: '/repair/air-conditioner',
    current: false,
  },
  { name: 'Pneumatique', href: '/repair/tires', current: false },
  { name: 'Pièces détachées', href: '/repair/car-parts', current: false },
  { name: 'Parallélisme', href: '/repair/parallelism', current: false },
];

function classNames<T>(...classes: T[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  title: string;
};

function RepairSideMenu({ title }: Props) {
  navigation.filter((page) =>
    title === page.name ? (page.current = true) : (page.current = false)
  );

  return (
    <div className="mb-10">
      <ul className="p-2 block shadow-lg space-y-5 w-64">
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

export default RepairSideMenu;
