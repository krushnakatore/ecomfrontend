import React, { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/Auth';
import '../../styles/Auth.styles.css';

export const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState();
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/auth/forgot-password`,
        {
          email,
          answer,
          newPassword,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <Layout title={'Forgot Password -Ecommerce App'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="title">RESET PASSWORD</div>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="What is your favourite animal?"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-3">
            <button className="mb-3" type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
