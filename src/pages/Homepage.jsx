import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { useAuth } from '../context/Auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { Prices } from '../components/Prices';
import { Radio, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { AiOutlineLoading, AiOutlineReload } from 'react-icons/ai';
import '../styles/Homepage.styles.css';

export const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-count`
      );

      if (data.success) {
        setTotal(data?.total);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-list/${page}`
      );
      if (data.success) {
        setLoading(false);
        setProducts([...products, ...data?.products]);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  //
  const getAllProducts = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-list/${page}`
      );

      if (data.success) {
        setLoading(false);
        setProducts(data.products);
      }
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (e) {
      console.log(e);
      toast.error('something went wrong in getting all categories');
    }
  };

  const getFilteredProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/filter-product`,
        { checked, radio }
      );

      if (data.success) {
        setLoading(false);
        setProducts(data?.products);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error('something went wrong in filtering all products');
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      getFilteredProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={'All-Products - Best Offers'}>
      <div
        className="container-fluid row mt-3 home-page"
        style={{ paddingTop: '50px' }}
      >
        <div className="col-md-3 filters">
          <h6 className="text-center">Filter By Category</h6>
          <hr />
          <div className="d-flex flex-column">
            {categories.map((category) => {
              return (
                <>
                  <Checkbox
                    key={category._id}
                    onChange={(e) =>
                      handleFilter(e.target.checked, category._id)
                    }
                  >
                    {category.name}
                  </Checkbox>
                </>
              );
            })}
          </div>
          <h6 className="text-center mt-4">Filter By Prices</h6>
          <hr />

          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((price) => {
                return (
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <div
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </div>
          </div>
        </div>
        <div
          className="col-md-9"
          style={{
            flex: 6,
          }}
        >
          <h3 className="text-center">All Products</h3>
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
                <div className="d-flex flex-wrap">
                  {products
                    ? products?.map((product) => {
                        return (
                          <>
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
                                <div className="card-name-price">
                                  <h5 className="card-title">
                                    {product?.name}
                                  </h5>
                                  <p className="card-text card-price">
                                    Rs.{product?.price}
                                  </p>
                                </div>
                                <p className="card-text">
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
                                <button
                                  className="btn btn-secondary ms-1"
                                  onClick={() => {
                                    setCart([...cart, product]);
                                    localStorage.setItem(
                                      'cart',
                                      JSON.stringify([...cart, product])
                                    );
                                    toast.success(
                                      'Item added successfully in the cart '
                                    );
                                  }}
                                >
                                  ADD TO CART
                                </button>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : ''}
                </div>
                <div className="m-2 p-3">
                  {products && products.length < total && (
                    <button
                      className="btn loadmore"
                      onClick={(e) => {
                        e.preventDefault();
                        setpage(page + 1);
                      }}
                    >
                      {loading ? (
                        'loading...'
                      ) : (
                        <>
                          Loadmore <AiOutlineReload />{' '}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
