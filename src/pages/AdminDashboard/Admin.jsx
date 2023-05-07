import React from 'react';
import { AdminMenu } from '../../components/Layout/AdminMenu';
import { Layout } from '../../components/Layout/Layout';
import { useAuth } from '../../context/Auth';

export const Admin = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <div
          className="container-fluid m-3 p-3"
          style={{ height: '80vh', paddingTop: '50px' }}
        >
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9" style={{ paddingTop: '50px' }}>
              <div className="card w-75 p-3">
                <h4>Admin Name : {auth?.user?.name}</h4>
                <h4>Admin Email : {auth?.user?.email}</h4>
                <h4>Admin Contact : {auth?.user?.phone}</h4>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
