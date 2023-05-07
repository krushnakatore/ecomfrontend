import React from 'react';
import { useSearch } from '../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-search/${values.keyword}`
      );

      setValues({ ...values, results: data });
      navigate('/search');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {' '}
      <form class="d-flex my-2 my-lg-0" onSubmit={(e) => handleSubmit(e)}>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          style={{ marginLeft: '3%' }}
        >
          Search
        </button>
      </form>
    </div>
  );
};
