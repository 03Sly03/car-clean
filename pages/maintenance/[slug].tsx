import React from 'react';
import Layout from '../../components/Layout';
import MaintenanceSideMenu from '../../components/MaintenanceSideMenu';
import Maintenance from '../../models/Maintenance';
import Promotion from '../../models/Promotion';
import db from '../../utils/db';

function ActivityScreen(props: any) {
  const { maintenance } = props;
  const { promotion } = props;
  if (!maintenance) {
    return <div>Activitée non trouvé</div>;
  }

  return (
    <Layout title="Maintenance">
      <div className="flex flex-col md:flex-row relative">
        <MaintenanceSideMenu title={maintenance.title} />
        <div className="grid grid-cols-1 w-full space-y-10 p-10 md:ml-40 md:mr-10 lg:ml-60 lg:mr-20">
          <div className="flex flex-col space-y-10">
            <h1 className="text-xl md:text-3xl font-bold text-center">
              {maintenance.title}
            </h1>
            {maintenance.activities.map((activity: any, index: number) => (
              <div key={index} className="card-maintenance">
                <h2 className="font-semibold text-center md:text-xl mb-5 w-full bg-[#ef7937] p-3 rounded-full">
                  {activity.name}
                </h2>
                <div className="flex justify-center w-full">
                  <p className="mb-12 text-sm text-justify">
                    {activity.description}
                  </p>
                </div>
                <ul>
                  {activity.tasks.map((task: any, index: number) => (
                    <li key={index}>
                      <div className="flex justify-between border-b border-[#2f2f47] mb-2">
                        <p className="border-b font-semibold">{task.name}</p>
                        {task.price !== 0 ? (
                          <p>
                            {promotion.serviceName === task.name ? (
                              <span className="font-semibold flex">
                                <svg
                                  height="24"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m13.708 11.808-5.658 1.414a.5.5 0 1 0 .242.97l5.658-1.414a.5.5 0 0 0 -.242-.97z" />
                                  <path d="m11.707 11.671a1.5 1.5 0 0 0 1.061-2.56 1.536 1.536 0 0 0 -2.122 0 1.5 1.5 0 0 0 1.061 2.56zm-.353-1.853a.5.5 0 1 1 0 .707.5.5 0 0 1 0-.707z" />
                                  <path d="m9.232 14.768a1.5 1.5 0 1 0 2.122 0 1.5 1.5 0 0 0 -2.122 0zm1.414 1.414a.51.51 0 0 1 -.707 0 .5.5 0 0 1 .354-.853.494.494 0 0 1 .353.146.5.5 0 0 1 0 .707z" />
                                  <path d="m21.894 4.341a2.49 2.49 0 0 0 -.561-1.657 2.3 2.3 0 0 0 -1.833-.754 2.558 2.558 0 0 0 -2.015.866 3.388 3.388 0 0 0 -.651 1.204h-6.334a.5.5 0 0 0 -.354.146l-8.292 8.293a1.5 1.5 0 0 0 0 2.122l7.585 7.585a1.5 1.5 0 0 0 2.122 0l8.293-8.292a.5.5 0 0 0 .146-.354v-6.168a3.12 3.12 0 0 0 1.894-2.991zm-2.894 8.952-8.146 8.146a.5.5 0 0 1 -.708 0l-7.585-7.585a.5.5 0 0 1 0-.708l8.146-8.146h5.907a8.243 8.243 0 0 0 -.014 1.969.5.5 0 1 0 .991-.131 7.162 7.162 0 0 1 .039-1.838h.87a.5.5 0 0 1 .5.5zm1-7.052v-.741a1.5 1.5 0 0 0 -1.5-1.5h-.589a2.119 2.119 0 0 1 .328-.546 1.576 1.576 0 0 1 1.261-.524 1.351 1.351 0 0 1 1.076.407 1.547 1.547 0 0 1 .318 1 2.386 2.386 0 0 1 -.894 1.904z" />
                                </svg>
                                &nbsp;&nbsp;
                                {(
                                  task.price *
                                  ((100 - promotion.reduction) / 100)
                                ).toFixed(2)}{' '}
                                € &nbsp;-&nbsp;&nbsp;
                                <span className="line-through font-thin">
                                  {task.price} €
                                </span>
                              </span>
                            ) : (
                              `${task.price} €`
                            )}
                          </p>
                        ) : (
                          <p>N/C</p>
                        )}
                      </div>
                      <p className="mb-5 text-xs text-justify w-[40%]">
                        {task.description}
                      </p>
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
  context.res.setHeader(
    'cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=86400'
  );
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const data = await Maintenance.findOne({ slug }).lean();
  const maintenance = JSON.stringify(data);
  const promoData = await Promotion.find();
  await db.disconnect();

  const stringifyPromoData = JSON.stringify(promoData[0]);

  return {
    props: {
      maintenance: maintenance ? JSON.parse(maintenance) : null,
      promotion: JSON.parse(stringifyPromoData),
    },
  };
}
