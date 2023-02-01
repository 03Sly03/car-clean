import React from 'react';
import Layout from '../components/Layout';
import MaintenanceItem from '../components/MaintenanceItem';
import db from '../utils/db';
import Maintenance from '../models/Maintenance';
import { MaintenanceData } from '../src/types/datas';
// import Link from 'next/link';

type Props = {
  activities: MaintenanceData[];
};

function MaintenanceScreen({ activities }: Props) {
  return (
    <Layout title="Maintenance">
      {/* <Link
        href="/"
        className="font-extrabold bg-[#2F2F47] text-white p-3 rounded-xl"
      >
        Retour
      </Link> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10 mb-20">
        {activities.map((activity) => (
          <MaintenanceItem activity={activity} key={activity.slug} />
        ))}
      </div>
    </Layout>
  );
}

export default MaintenanceScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Maintenance.find();
  const activities = JSON.stringify(data);
  return {
    props: {
      activities: JSON.parse(activities),
    },
  };
}
