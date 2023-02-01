import Link from 'next/link';
import React from 'react';
import { MaintenanceData } from '../src/types/datas';

type Props = {
  activity: MaintenanceData;
};

function MaintenanceItem({ activity }: Props) {
  return (
    <div className="card">
      <Link href={`/maintenance/${activity.slug}`}>
        <div className="flex flex-col items-center justify-center p-5">
          <h2 className="text-2xl font-bold text-center w-full bg-[#ef7937] p-3 rounded-full mb-5">
            {activity.title}
          </h2>
          <div className="card-maintenance">
            <h3 className="text-center mb-5">
              {activity.activities.map((activity, index) => (
                <div key={index}>
                  <h2>{activity.name}</h2>
                </div>
              ))}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MaintenanceItem;
