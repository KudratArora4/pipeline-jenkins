import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';  
import { doc, setDoc } from 'firebase/firestore'; 
import './Forms.css'; 

function Signup() 
{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => 
    {
    e.preventDefault();
    if (password !== confirmPassword) 
        {
      alert("Passwords do not match. Try Again");
      return;
    }

    try 
    {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), 
      {
        name: name,
        email: email,
        password: password,
        createdAt: new Date()
      });

      alert(`Thank you for signing up, ${name}. Please log in to your account.`);
      navigate('/login'); 
    } 
    
    catch (error) 
    {
      alert("Signup failed. Please try again");
      console.error("Signup error:", error);
    }
  };

  /* FOR BCRYPT - HASHING OF PASSWORDS
    const handleSignup = async (e) => 
    {
    e.preventDefault();
    if (password !== confirmPassword) 
    {
      alert("Passwords do not match.");
      return;
    }

    try {
      //Hash password
      const salt = bcrypt.genSaltSync(10); 
      const hashedPassword = bcrypt.hashSync(password, salt); 

      const userCredential = await createUserWithEmailAndPassword(auth, email, hashedPassword);
      const user = userCredential.user;

 
      await setDoc(doc(db, "users", user.uid), 
      {
        name: name,
        email: email,
        password: hashedPassword,
        createdAt: new Date() 
      });

      alert(`Thank you for signing up, ${name}. Please log in to your account.`);
      navigate('/login'); 
    } catch (error) 
     {
      alert("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };*/

  return (
    <div className="container">
      <div className="left_panel">
        <div className="text">
          <h2>Join DEV@Deakin</h2>
          <p>Become a part of our community for the latest updates!!</p>
        </div>
      </div>
      <div className="right_panel">
        <div className="form">
          <h1>DEV@Deakin</h1>
          <h2>Create your account</h2>
          <form onSubmit={handleSignup}>
            <label id="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

            <label id="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="form_btn">Sign Up</button>

            <div className="link-line">
              <Link to="/login">Already have an account? Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;