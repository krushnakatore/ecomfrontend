import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { UserMenu } from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/Auth';

export const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/auth/update-profile`,
        { name, email, phone, address },
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data?.err) {
        toast.error(data?.err);
      }
      if (data.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('Registration Successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error in registration');
    }
  };

  useEffect(() => {
    const { email, phone, address, name } = auth?.user;
    setAddress(address);
    setPhone(phone);
    setName(name);
    setEmail(email);
  }, [auth?.user]);

  return (
    <Layout title={'Your Profile'}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: '-40px' }}>
              <form onSubmit={handleSubmit}>
                <div className="title">USER PROFILE</div>
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
                    disabled
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
                  />
                </div>

                <button type="submit" class="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
