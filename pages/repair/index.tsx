import React from 'react';
import RepairSideMenu from '../../components/RepairSideMenu';
import Layout from '../../components/Layout';

function MaintenanceScreen() {
  return (
    <Layout title="Maintenance" subtitle="Maintenance">
      <div className="flex flex-col md:flex-row mt-20">
        <RepairSideMenu title="Maintenance" />
        <div className="flex w-full justify-center">
          <div className="grid grid-cols-1 w-full space-y-10 p-10 lg:mx-20">
            <h1 className="text-2xl font-bold text-center">
              Entretient courrant
            </h1>
            <div className="card-maintenance">
              <h2 className="text-center mb-5 w-full bg-[#ef7937] p-3 rounded-full">
                Vidange
              </h2>
              <ul>
                <li className="flex justify-between border-b">
                  <p>Filtres</p>
                  <p>... 15 €</p>
                </li>
                <li className="flex justify-between border-b">
                  <p>Huile</p>
                  <p>... 45 €</p>
                </li>
              </ul>
            </div>
            <div className="card-maintenance">
              <h2 className="text-center mb-5 w-full bg-[#ef7937] p-3 rounded-full">
                Frein
              </h2>
              <ul>
                <li className="flex justify-between border-b">
                  <p>Disques</p>
                  <p>... 30 €</p>
                </li>
                <li className="flex justify-between border-b">
                  <p>Plaquettes</p>
                  <p>... 20</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MaintenanceScreen;
