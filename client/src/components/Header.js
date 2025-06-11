import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handlelogout = () =>
  {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logout..");
    navigate("/login");

  }

  return (
    <nav className='navbar navbar-expand-lg bg-primary shadow-sm mb-4 py-3'>
      <div className='container'>
        <Link className='navbar-brand text-white fw-bold fs-4' to='/'>
          Blog<span className='text-warning'>ByMe</span>
        </Link>
        <button
          className='navbar-toggler border-0'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link text-white fw-semibold' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white fw-semibold' to='/add-blog'>
                Add Blog
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white fw-semibold' to='/add-category'>
                Add Category
              </Link>
            </li>
          </ul>
          <div className='d-flex align-items-center'>
            {token ? (
              <>
                <span className='text-white me-3 fw-semibold'>
                  Welcome, <span className='text-warning'>{username}</span>
                </span>
                <button className='btn btn-outline-light' onClick={handlelogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <button className='btn btn-outline-light me-2'>Login</button>
                </Link>
                <Link to='/register'>
                  <button className='btn btn-warning text-dark'>Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
