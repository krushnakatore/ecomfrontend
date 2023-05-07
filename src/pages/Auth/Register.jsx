import React, { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.styles.css';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/auth/register`,
        {
          name,
          email,
          phone,
          address,
          password,
          answer,
        }
      );

      if (res.data.success) {
        toast.success('Registration Successfully');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title={'Register - Ecommerce App'}>
      <div className="form-container" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit}>
          <div className="title">REGISTER FORM</div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              required
            />
          </div>
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
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Mobile Number"
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
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Address"
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
              placeholder="What is your Favorite Animal?"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};
