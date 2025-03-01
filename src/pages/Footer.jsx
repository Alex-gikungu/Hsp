import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt /> kericho Hospital St, City, kericho</p>
          <p><FaPhone /> (+235) 112043557</p>
          <p><FaEnvelope /> kerichohsp@hospital.com</p>
          <p><FaClock /> Mon - Fri: 8 AM - 8 PM</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/clinc">Clincs </a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/appointments">Appointments</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hospital Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;