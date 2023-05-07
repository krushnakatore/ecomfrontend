import React from 'react';
import { NavLink } from 'react-router-dom';

export const UserMenu = () => {
  return (
    <div className="text-center">
      <ul className="list-group">
        <h4>Admin panel</h4>
        <NavLink className="list-group-item" to="/dashboard/user/profile">
          Profile
        </NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item">
          Orders
        </NavLink>
      </ul>
    </div>
  );
};
