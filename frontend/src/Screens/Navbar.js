import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.userSignin);

  function openMenu() {
    document.querySelector('.sidebar').classList.add('open');
  }
  function closeMenu() {
    document.querySelector('.sidebar').classList.remove('open');
  }

  return (
    <>
      <header className='header'>
        <div className='brand'>
          <button onClick={openMenu}>&#9776;</button>
          <Link className='logo' to='/'>
            Shopping
          </Link>
        </div>
        <div className='header-links'>
          <Link to='/cart'>Cart</Link>
          {userInfo ? (
            <Link to='#'>{userInfo.name}</Link>
          ) : (
            <Link to='/signin'>Sign In</Link>
          )}
        </div>
      </header>
      <aside className='sidebar'>
        <h3>Shopping Categories</h3>
        <button className='sidebar-close-button' onClick={closeMenu}>
          x
        </button>
        <ul>
          <li>
            <Link to='/category/shirts'>Shirts</Link>
          </li>
          <li>
            <Link to='/category/pants'>Pants</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
