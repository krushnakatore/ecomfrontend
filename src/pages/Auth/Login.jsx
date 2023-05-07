import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/Auth';
import '../../styles/Auth.styles.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFlag(false);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        console.log('entered');
        setFlag(true);
        toast.error(res.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Layout title={'Login - Ecommerce App'}>
      <div className="form-container" style={{ minHeight: '90vh' }}>
        <form onSubmit={handleSubmit}>
          <div className="title">LOGIN FORM</div>
          <div className="mb-3">
            {' '}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => navigate('/forgot-password')}
            >
              Forget Password
            </button>
          </div>
          {flag && (
            <div style={{ color: 'red' }}>Incorrect Email Id or Password</div>
          )}
          <div className="mb-3">
            <button className="mb-3" type="submit" class="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
