import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import { useSearch } from '../../context/Search';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={'Search Results'}>
      <div className="container">
        <div className="text-center">
          <h3>Search Results</h3>
          <h6>
            {values.results.length < 1
              ? 'No Products Found'
              : ` Found ${values.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results
              ? values.results?.map((product) => {
                  return (
                    <>
                      <div className="card m-2" style={{ width: '18rem' }}>
                        <img
                          src={`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/product/product-photo/${product._id}`}
                          alt="product_photo"
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product?.name}</h5>
                          <p className="card-text">{product?.description}</p>
                          <p className="card-text">Rs.{product?.price}</p>

                          <div
                            className="btn btn-primary ms-1"
                            onClick={() =>
                              navigate(`/products/${product.slug}`)
                            }
                          >
                            More Details
                          </div>
                          <div className="btn btn-secondary ms-1">
                            Add to Cart
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
    </Layout>
  );
};
