import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { UserMenu } from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import moment from 'moment/moment';

export const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/auth/orders`,
        {
          headers: { Authorization: auth?.token },
        }
      );

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Layout>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center">All Orders </h3>
            {orders?.map((item, index) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.status}</td>
                        <td>{item?.buyer?.name}</td>
                        <td>{moment(item?.createdAt).fromNow()}</td>
                        <td>{'-'}</td>
                        <td>{item?.payment?.success ? 'Success' : 'Failed'}</td>
                        <td>{item?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {item.products
                      ? item?.products?.map((cp) => (
                          <div className="row m-2 p-2 card flex-row">
                            <div className="col-md-4">
                              <img
                                src={`/api/v1/product/product-photo/${cp._id}`}
                                alt="product_photo"
                                // className="card-img-top"
                                height={'200px'}
                                width="200px"
                                style={{ borderRadius: '10px' }}
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>{cp?.name}</h4>
                              <p>{cp?.description.substring(0, 30)}...</p>
                              <h4>Price: {cp?.price}</h4>
                            </div>
                          </div>
                        ))
                      : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
