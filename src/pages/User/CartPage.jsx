import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { useCart } from '../../context/Cart';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../styles/Cart.styles.css';

export const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/braintree/token`
      );

      if (data) {
        setClientToken(data?.clientToken);
        setInstance(data?.instance);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const totalPrice = () => {
    try {
      let total = 0;

      cart.map((cart, i) => {
        total += Number(cart.price);
      });
      return total.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeItem = (id) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === id);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem('cart', JSON.stringify(mycart));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nounce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/braintree/payment`,
        { nounce, cart },
        {
          headers: { Authorization: auth?.token },
        }
      );
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Payment successful');
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.success('Payment Error');
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? `Hello Guest`
                : `Hello ${auth?.token && auth?.user?.name}`}
            </h4>
            <p className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? '' : `Please login to checkout`
                  }`
                : 'Your cart is empty '}
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((cp) => (
                <div className="row card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-photo/${cp._id}`}
                      alt="product_photo"
                      // className="card-img-top"
                      height={'140px'}
                      width="100px"
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h4>{cp?.name}</h4>
                    <p>{cp?.description.substring(0, 30)}...</p>
                    <h4>Price: {cp?.price}</h4>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeItem(cp._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="col-md-4 cart-summary "
              style={{
                marginLeft: '4%',
                borderRadius: '10px',
                border: '1px solid grey',
                backgroundColor: 'lightgrey',
              }}
            >
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate('/dashboard/user/profile')}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate('/login', {
                            state: '/cart',
                          })
                        }
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                </>
              )}
              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ''
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: 'vault',
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePayment()}
                      disabled={!auth?.user?.address}
                    >
                      {loading ? 'Processing...' : 'Make Payment'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
