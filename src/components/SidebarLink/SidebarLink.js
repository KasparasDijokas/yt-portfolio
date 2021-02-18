import React from 'react';
import './sidebarLink.scss';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ linkTo, children, Icon }) => {
  
  return (
    <NavLink
      to={linkTo}
      exact
      className="sidebarLink"
      activeStyle={{ background: '#e5e5e5', fontWeight: 'bold' }}
    >
      <Icon className="sidebarLink__icon" />
      <p className="sidebarLink__text">{children}</p>
    </NavLink>
  );
};

export default SidebarLink;
