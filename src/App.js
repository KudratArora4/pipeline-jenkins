import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Homepage';  
import Login from './routes/Login'; 
import Signup from './routes/Signup'; 
import NewPostPage from './routes/NewPostPage';  
import FindQuestionsPage from './routes/FindQuestionsPage';  

import './App.css';
import { QuestionProvider } from './context/QuestionContext';

function App() {
  return (
    <QuestionProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<Signup />} />  
        <Route path="/newpost" element={<NewPostPage />} /> 
        <Route path="/findquestions" element={<FindQuestionsPage />} /> 
      </Routes>
    </Router>
    </QuestionProvider>
  );
}

export default App;