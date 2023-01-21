import React from 'react';
import Layout from '../components/Layout';
import UnderConstruction from '../components/UnderConstruction';

function Maintenance() {
  return (
    <Layout title="Réparation">
      <div className="flex items-center justify-center">
        <UnderConstruction />
      </div>
    </Layout>
  );
}

export default Maintenance;
