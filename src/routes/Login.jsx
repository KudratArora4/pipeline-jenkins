import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  
import './Forms.css'; 

function Login() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => 
    {
    e.preventDefault();
    try 
    {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`Welcome to DEV@Deakin, ${user.email}`);
      navigate('/');
    } catch (error) 
    {
      alert("Login failed. Invalid email or password.");
    }
  };

  return (
    <div className="container">
      <div className="left_panel">
        
        <div className="text">
          <h2>Welcome to DEV@Deakin</h2>
          <p>Join us for the latest updates and community support</p>
        </div>
      </div>

      <div className="right_panel">
        <div className="form">
          <h1>DEV@Deakin</h1>
          <h2>Login to your account</h2>
          
          <form onSubmit={handleLogin}>
            <label id="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label id="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="form_btn">Log in</button>

            <div className="link-line">
              <Link to="/signup">New to DEV@Deakin? Create Account</Link>
            </div>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;