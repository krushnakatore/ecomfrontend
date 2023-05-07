import React, { useEffect, useState } from 'react';
import { AdminMenu } from '../../components/Layout/AdminMenu';
import { Layout } from '../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import moment from 'moment';
import { Select, Spin } from 'antd';
import { Option } from 'antd/es/mentions';

export const AdminOrders = () => {
  const [status, setStatus] = useState([
    'Not Processed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancel',
  ]);
  const [changeStatus, setChangeStatus] = useState();
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  const handleChangeStatus = async (orderId, status) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/auth/order-status/${orderId}`,
        { status: status },
        {
          headers: { Authorization: auth?.token },
        }
      );

      getOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/auth/all-orders`,
        {
          headers: { Authorization: auth?.token },
        }
      );

      if (data.success) {
        setLoading(false);
        setOrders(data.orders);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout title={'Admin Orders'}>
      <div className="containerfluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{ paddingTop: '50px' }}>
            {loading ? (
              <Spin
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              <>
                <div className="text-center">All Orders</div>
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
                            <td>
                              <Select
                                bordered={false}
                                onChange={(value) =>
                                  handleChangeStatus(item._id, value)
                                }
                                defaultValue={item?.status}
                              >
                                {status.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td>{item?.buyer?.name}</td>
                            <td>{moment(item?.createdAt).fromNow()}</td>
                            <td>{'-'}</td>
                            <td>
                              {item?.payment?.success ? 'Success' : 'Failed'}
                            </td>
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
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
