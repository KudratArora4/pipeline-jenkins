import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import ArticleForm from '../ArticleForm'; 
import QuestionForm from '../QuestionForm'; 
import './NewPostPage.css'; 

const NewPostPage = () => {
  const [postType, setPostType] = useState('question'); 

  const handleToggle = (type) => {
    setPostType(type);
  };

  return (
    <div className="new-post-container">
      
      <div className="back-link">
        <Link to="/">&#60; Back to Homepage</Link>
      </div>

      <div className="heading"> 
        <h1>What do you want to Ask or Share?</h1>
      </div> 

      <div className="post-type-selector">
        <button
          className={`toggle-button ${postType === 'question' ? 'active' : ''}`}
          onClick={() => handleToggle('question')}
        >
          Question
        </button>
        <button
          className={`toggle-button ${postType === 'article' ? 'active' : ''}`}
          onClick={() => handleToggle('article')}
        >
          Article
        </button>
      </div>

      {/*conditional Rendering of forms*/}
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
};

export default NewPostPage;
