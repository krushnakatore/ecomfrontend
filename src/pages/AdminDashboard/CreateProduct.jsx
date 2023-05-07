import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState('');
  const [shipping, setShipping] = useState('');
  const [auth] = useAuth('');
  const navigate = useNavigate();

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

  useEffect(() => {
    getAllCategories();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    productData.append('name', name);
    productData.append('description', description);
    productData.append('category', category);
    productData.append('quantity', quantity);
    productData.append('price', price);
    productData.append('photo', photo);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/create-product`,
        productData,
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (res.data.success) {
        toast.success('Product created successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error('Error creating product');
    }
  };

  return (
    <Layout>
      <div className="containerfluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{ paddingTop: '50px' }}>
            <h3>Create Product</h3>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories
                  ? categories.map((c) => {
                      return (
                        <>
                          <Option key={c._id} value={c._id}>
                            {c.name}
                          </Option>
                        </>
                      );
                    })
                  : ''}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : 'Upload Photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  name="name"
                  value={description}
                  size="large"
                  rows
                  placeholder="Write a Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="name"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="name"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  type="text"
                  name="name"
                  value={shipping}
                  placeholder="Write a Name"
                  className="form-control"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <div className="btn btn-primary" onClick={createProduct}>
                  Create Product
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
