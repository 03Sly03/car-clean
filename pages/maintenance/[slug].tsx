import React from 'react';
import Layout from '../../components/Layout';
import MaintenanceSideMenu from '../../components/MaintenanceSideMenu';
import Maintenance from '../../models/Maintenance';
import db from '../../utils/db';

function ActivityScreen(props: any) {
  const { maintenance } = props;
  console.log('le maintenance: ', maintenance);
  if (!maintenance) {
    return <div>Activitée non trouvé</div>;
  }

  return (
    <Layout title="Maintenance">
      <div className="flex flex-col md:flex-row relative">
        <MaintenanceSideMenu title={maintenance.title} />
        <div className="grid grid-cols-1 w-full space-y-10 p-10 md:ml-40 md:mr-10 lg:ml-60 lg:mr-20">
          <div className="flex flex-col space-y-10">
            <h1 className="text-2xl font-bold text-center">
              {maintenance.title}
            </h1>
            {maintenance.activities.map((activity: any, index: number) => (
              <div key={index} className="card-maintenance">
                <h2 className="font-semibold text-center mb-5 w-full bg-[#ef7937] p-3 rounded-full">
                  {activity.name}
                </h2>
                <p className="mb-5 border-b">{activity.description}</p>
                <ul>
                  {activity.tasks.map((task: any, index: number) => (
                    <li key={index}>
                      <div className="flex justify-between border-b mb-2">
                        <p className="border-b font-semibold">{task.name}</p>
                        <p>{task.price}</p>
                      </div>
                      <p className="mb-5 text-xs">{task.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ActivityScreen;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;
  console.log('le slug: ', slug);

  await db.connect();
  const data = await Maintenance.findOne({ slug }).lean();
  const maintenance = JSON.stringify(data);
  await db.disconnect();
  return {
    props: {
      maintenance: maintenance ? JSON.parse(maintenance) : null,
    },
  };
}
