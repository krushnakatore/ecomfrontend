import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ProductDetails.styles.css';
import { useCart } from '../../context/Cart';
import { toast } from 'react-hot-toast';

export const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [similarProduct, setSimilarProduct] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setProduct(data?.product[0]);
        getSimilarProduct(data?.product[0]._id, data?.product[0].category._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-similar/${pid}/${cid}`
      );
      if (data.success) {
        setSimilarProduct(data?.product);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const handleCart = () => {
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    toast.success('Item added successfully in the cart ');
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="card-img-top"
            height="300"
            width="300px"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name: {product?.name}</h6>
          <h6>description: {product?.description}</h6>
          <h6>price: Rs.{product?.price}</h6>
          <h6>category: {product?.category?.name}</h6>
          <h6>shipping: {product?.shipping}</h6>
          <button className="btn btn-secondary ms-1" onClick={handleCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="row container similar-products">
        <h3>Similar Products</h3>
        {similarProduct.length < 1 && (
          <p className="text-center">No Similar Product Found</p>
        )}
        <div className="d-flex flex-wrap">
          {similarProduct
            ? similarProduct?.map((product) => {
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
                          <p className="card-text">Rs.{product?.price}</p>
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
                      </div>
                    </div>
                  </>
                );
              })
            : ''}
        </div>
      </div>
    </Layout>
  );
};
