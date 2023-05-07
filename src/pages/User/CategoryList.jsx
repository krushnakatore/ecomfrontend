import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';

export const CategoryList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-categorywise/${params.slug}`
      );
      if (data.success) {
        setProducts(data?.product);
        setCategory(data?.categories);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container m-3 category" style={{ paddingTop: '50px' }}>
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap ">
              {!loading ? (
                products?.map((product) => {
                  return (
                    <>
                      <div className="card m-2" style={{ width: '16rem' }}>
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          alt="product_photo"
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <div className="card-name-price">
                            <h5 className="card-title">{product?.name}</h5>
                            <p className="card-title card-price">
                              Rs.{product?.price}
                            </p>
                          </div>
                          <p className="card-text ">
                            {product?.description.substring(0, 30)}...
                          </p>
                          <div className="card-name-price">
                            <button
                              className="btn btn-primary ms-1"
                              onClick={() =>
                                navigate(`/products/${product.slug}`)
                              }
                            >
                              More Details
                            </button>
                          </div>
                          {/* <div className="btn btn-secondary ms-1">
                              Add to Cart
                            </div> */}
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <Spin
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
