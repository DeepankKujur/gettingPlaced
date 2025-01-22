import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';  // Import the Twitter icon
import { RiInstagramFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Contact */}
        <div className="contact-section">
          <h4 className="title">Let's keep in touch!</h4>
          <h5 className="subtitle">
            Find us on any of these platforms, we respond 1-2 business days.
          </h5>
          <div className="social-buttons">
            {/* Using React Icons for Twitter */}
            <a href="https://twitter.com" target="_blank" className="social-btn twitter">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" className="social-btn facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" className="social-btn instagram">
              <RiInstagramFill />
            </a>
            <a href="https://github.com" target="_blank" className="social-btn github">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className="links-section">
          <div className="other-resources">
            <span className="section-title">Other Resources</span>
            <ul>
              <li><a href="https://www.creative-tim.com/presentation?ref=njs-profile">About Us</a></li>
              <li><a href="https://creative-tim.com/terms?ref=njs-profile">Terms & Conditions</a></li>
              <li><a href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a></li>
              <li><a href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="copyright">
          Copyright &copy; <span id="current-year">2024</span>
          <a href="https://www.creative-tim.com/product/notus-js" target="_blank" rel="noopener noreferrer">Note WC by </a>
          <a href="https://www.creative-tim.com?ref=njs-profile" target="_blank" rel="noopener noreferrer">Creative Team</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
