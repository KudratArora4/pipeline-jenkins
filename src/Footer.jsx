import React from 'react';
import SocialIcons from './SocialIcons';
import './Footer.css';

function Footer() 
  {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h2>Explore</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#questions">Questions</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#tutorials">Tutorials</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Support</h2>
          <ul>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#help">Help</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Stay Connected</h2>
          <SocialIcons />
        </div>
      </div>
      <div className="footer-middle">
        <p>DEV @ Deakin 2024</p>
      </div>
      <div className="footer-bottom">
        <a href="#privacy-policy">Privacy Policy</a>
        <a href="#terms">Terms</a>
        <a href="#code-of-conduct">Code of Conduct</a>
      </div>
    </footer>
  );
};

export default Footer;