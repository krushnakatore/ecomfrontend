import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Layout } from '../../components/Layout/Layout';
import { useAuth } from '../../context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from 'antd';
import { AdminMenu } from '../../components/Layout/AdminMenu';
import { Option } from 'antd/es/mentions';

export const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState('');
  const [shipping, setShipping] = useState('');
  const [id, setId] = useState();
  const [auth] = useAuth('');
  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setName(data.product[0].name);
        setCategory(data.product[0].category._id);
        setDescription(data.product[0].description);
        setPrice(data.product[0].price);
        setPhoto(data.product[0].photo);
        setShipping(data.product[0].shipping);
        setId(data.product[0]._id);
      }
    } catch (e) {
      console.log(e);
      toast.error('something went wrong in getting all categories');
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

  useEffect(() => {
    getSingleProduct();
    getAllCategories();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    productData.append('name', name);
    productData.append('description', description);
    productData.append('category', category);
    productData.append('quantity', quantity);
    productData.append('price', price);
    photo && productData.append('photo', photo);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (res.data.success) {
        toast.success('Product Updated successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error('Error updating product');
    }
  };

  const deleteProduct = async () => {
    try {
      let answer = window.prompt(
        'Are you sure you want to delete this product?'
      );
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success('Product Deleted Successfully');
        navigate('/dashboard/admin/products');
      }
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong in deleting product');
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Update Product</h3>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              size="large"
              showSearch
              value={category}
              className="form-select mb-3"
              onChange={(value) => setCategory(value)}
            >
              {categories
                ? categories?.map((c) => {
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
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={'200px'}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  {' '}
                  <img
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-photo/${id}`}
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
                placeholder="Write a Name"
                className="form-control"
                onChange={(value) => setShipping(value)}
                value={shipping ? 'Yes' : 'No'}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </div>
            <div className="mb-3">
              <div className="btn btn-primary" onClick={updateProduct}>
                Update Product
              </div>
            </div>
            <div className="mb-3">
              <div className="btn btn-primary" onClick={deleteProduct}>
                Delete Product
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
