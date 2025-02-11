import React from 'react';
import './NewsletterSignup.css';


function NewsletterSignup()
{
  return (
    <div className="newsletter-container">
      <div className="LeftSection">
        <h1>DEV@Deakin</h1>
      </div>
      <div className="RightSection">
        <h2>Sign-up for our Daily Insider</h2>
        <form method="POST" action="/subscribe">
          <input type="email" name="email" placeholder="Enter your Email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;