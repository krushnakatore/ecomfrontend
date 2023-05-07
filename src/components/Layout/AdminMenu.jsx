import React from 'react';
import { NavLink } from 'react-router-dom';

export const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <ul className="list-group">
          <h4>Admin panel</h4>
          <NavLink
            className="list-group-item"
            to="/dashboard/admin/create-category"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item"
          >
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item">
            Products
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item">
            Users
          </NavLink>
          <NavLink to="/dashboard/admin/orders" className="list-group-item">
            Orders
          </NavLink>
        </ul>
      </div>
    </>
  );
};
