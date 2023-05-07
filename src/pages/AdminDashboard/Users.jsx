import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Layout/AdminMenu';

export const Users = () => {
  return (
    <Layout>
      <div className="containerfluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>All Users</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};
