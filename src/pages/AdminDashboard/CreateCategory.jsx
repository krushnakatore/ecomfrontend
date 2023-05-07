import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { CategoryForm } from '../../components/Form/CategoryForm';
import { useAuth } from '../../context/Auth';
import Modal from 'antd/es/modal/Modal';

export const CreateCategory = () => {
  const [categories, setcategories] = useState([]);
  const [newCategory, setNewCategory] = useState();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [auth] = useAuth();

  const handleCreateCategaory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/category/create-category`,
        {
          name: newCategory,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        // console.log(data);
        getAllCategories();
      }
    } catch (e) {
      console.log(e);
      toast.error('something went wrong in getting all categories');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/category/update-category/${selected._id}`,
        { name: newCategory },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        toast.success('successfully updated');
        setSelected(null);
        setNewCategory('');
        setVisible(false);
        getAllCategories();
      }
    } catch (e) {
      console.log(e);
      toast.error('something went wrong in getting all categories');
    }
  };

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        toast.success('successfully Deleted');
        setSelected(null);
        setNewCategory('');
        getAllCategories();
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
        setcategories(data.category);
      }
    } catch (e) {
      console.log(e);
      toast.error('something went wrong in getting all categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{ paddingTop: '50px' }}>
            <h3>Manage Category</h3>
            <div className="p-3">
              <CategoryForm
                handleCreateCategaory={handleCreateCategaory}
                setNewCategory={setNewCategory}
                newCategory={newCategory}
              />
            </div>
            <div>
              <div className="w-75">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories
                      ? categories?.map((categories, index) => {
                          return (
                            <>
                              <tr>
                                <td>{categories.name}</td>
                                <td>
                                  <button
                                    className="btn btn-primary ms-2"
                                    onClick={() => {
                                      setVisible(true);
                                      setNewCategory(categories.name);
                                      setSelected(categories);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger ms-2"
                                    onClick={(e) => {
                                      handleDeleteCategory(e, categories._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      : ''}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                handleCreateCategaory={handleUpdateCategory}
                setNewCategory={setNewCategory}
                newCategory={newCategory}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};
