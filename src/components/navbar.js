import React from 'react';
import styles from '../css/navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export default function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('dataForAuth');
    navigate('/user/request', { replace: true });
  };

  return (
    <>
      <header className='header'>
        <h3 className='logo'>
          <img src={logo} height={100 + 'px'} alt='Logo'></img>
        </h3>
        <ul className='main-nav'>
          <li>
            <NavLink to="/user/item" className={({ isActive }) => (isActive ? 'active' : {})}>
              Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/vendor" className={({ isActive }) => (isActive ? 'active' : {})}>
              Vendor
            </NavLink>
          </li>
          <li className='dropdown'>
            <span className='dropbtn'>Request</span>
            <div className='dropdown-content'>
              <NavLink to="/user/request/create" activeClassName='active'>
                Create Request
              </NavLink>
              <NavLink to="/user/request/track" activeClassName='active'>
                Track Request
              </NavLink>
              <NavLink to="/user/request/history" activeClassName='active'>
                History
              </NavLink>
            </div>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      </header>
    </>
  );
}
