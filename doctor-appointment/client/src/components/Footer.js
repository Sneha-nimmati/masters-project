import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import ".././styles/footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="footer-section">
      <div className="contact-us">
        <div>
          <h5>CONTACT US</h5>
            <div className='address-section'>
              <p>2130 Mechanic st.</p>
              <p>Manchester</p>
              <p>New Hampshire 03102</p>
            </div>
            <div className='phone-section'>
             <p>Phone: 6031938392 </p>
             <p>gmail:bookapp@gmail.com</p>
            </div>
        </div>
      </div>
      <div className="footer__copyright">
        <p>&copy; All rights reserved.</p>
      </div>
      <div className="footer__social">
        <a href="https://www.facebook.com"><FaInstagram /></a>
        <a href="https://www.instagram.com"><FaFacebook/></a>
        <a href="https://www.twitter.com"><FaTwitter /></a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
