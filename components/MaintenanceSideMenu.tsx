import Link from 'next/link';
import React from 'react';

const navigation = [
  {
    name: 'Entretient courrant',
    href: '/maintenance/change-worn-parts',
    current: false,
  },
  {
    name: 'Climatisation',
    href: '/maintenance/air-conditioner',
    current: false,
  },
  { name: 'Pneumatique', href: '/maintenance/tires', current: false },
  { name: 'Pièces détachées', href: '/maintenance/car-parts', current: false },
  { name: 'Parallèlisme', href: '/maintenance/parallelism', current: false },
];

function classNames<T>(...classes: T[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  title: string;
};

function MaintenanceSideMenu({ title }: Props) {
  navigation.filter((page) =>
    title === page.name ? (page.current = true) : (page.current = false)
  );

  return (
    <div className="mb-10 md:fixed h-full bg-[#2f2f47]">
      <ul className="p-2 flex flex-col text-center space-y-5 w-full md:text-left">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={classNames(
                item.current
                  ? 'text-white font-extrabold underline underline-offset-8'
                  : 'text-white font-semibold hover:font-bold',
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

export default MaintenanceSideMenu;
