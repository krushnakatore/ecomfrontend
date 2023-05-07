import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import { useCategory } from '../../hooks/useCategory';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

export const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container" style={{ paddingTop: '90px' }}>
        <div
          className="flex flex-wrap"
          style={{
            // display: 'flex',
            // flexWrap: 'wrap',
            // justifyContent: 'space-between',
            // width: '50%',
            marginTop: '1%',
          }}
        >
          {categories?.length ? (
            categories?.map((category) => (
              <Link
                style={{ textDecoration: 'none', color: 'grey' }}
                to={`/categories/${category.slug}`}
              >
                <div class="col-xl-3 col-sm-6 col-12 mt-2">
                  <div class="card">
                    <div class="card-content">
                      <div class="card-body">
                        <div class="media d-flex">
                          <div class="align-self-center">
                            <i class="icon-speech warning font-large-2 float-left"></i>
                          </div>
                          <div class="media-body text-right">
                            <h3>{category?.name}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Spin
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};
