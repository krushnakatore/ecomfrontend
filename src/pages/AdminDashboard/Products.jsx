import React, { useEffect, useState } from 'react';
import { AdminMenu } from '../../components/Layout/AdminMenu';
import { Layout } from '../../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/get-product`
      );
      if (data.success) {
        setLoading(false);
        setProducts(data.products);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Products List</h3>
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
                <div className="d-flex flex-wrap">
                  {products
                    ? products?.map((product) => {
                        return (
                          <>
                            <Link
                              key={product._id}
                              to={`/dashboard/admin/update-product/${product.slug}`}
                              className="product-link"
                            >
                              <div
                                className="card m-2"
                                style={{ width: '16rem' }}
                              >
                                <img
                                  src={`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-photo/${product._id}`}
                                  alt="product_photo"
                                  className="card-img-top"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {product?.name}
                                  </h5>
                                  <p className="card-text">
                                    {product?.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </>
                        );
                      })
                    : ''}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
