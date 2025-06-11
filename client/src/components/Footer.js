import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-5 pb-4 mt-auto">
      <div className="container text-md-start">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 col-lg-4 col-xl-3 mb-4">
            <h5 className="footer-brand text-uppercase fw-bold mb-3">Bhavy Zala</h5>
            <p>
              BlogByMe - A simple, clean and secure platform to share your blogs and ideas.
              <br />
              © 2025 All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link text-white text-decoration-none">Home</Link>
              </li>
              <li>
                <Link to="/add-blog" className="footer-link text-white text-decoration-none">Add Blog</Link>
              </li>
              <li>
                <Link to="/add-category" className="footer-link text-white text-decoration-none">Add Category</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <p className="footer-link"><i className="bi bi-envelope-fill me-2"></i>zalabhavy2004@gmail.com</p>
            <p>
              <i className="bi bi-globe me-2"></i>
              <a href="https://bhavy.netlify.app/" className="footer-link text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                bhavy.netlify.app
              </a>
            </p>
            <p className="footer-link"><i className="bi bi-geo-alt-fill me-2"></i> Ahmedabad, Gujarat, India</p>
          </div>

        </div>
      </div>

      <div className="text-center p-3 mt-4 bg-dark bg-opacity-25">
        Made with ❤️ by{' '}
        <a className="footer-link text-white fw-bold text-decoration-none" href="https://bhavy.netlify.app/" target="_blank" rel="noopener noreferrer">
          Bhavy Zala
        </a>
      </div>
    </footer>
  );
};

export default Footer;
