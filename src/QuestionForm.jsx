import React, { useState } from 'react';
import { addQuestion } from './firestoreService'; 
import './QAForms.css'; 

function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addQuestion(title, description, tags);
    

    setShowSuccessMessage(true);
    
    setTitle('');
    setDescription('');
    setTags('');
    
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 9000); 
  };

  return (
    <div className="container">
      <div className="left_panel">
        <div className="text">
          <h2>Post Your Question</h2>
          <p>Get help from the DEV@Deakin community</p>
        </div>
      </div>

      <div className="right_panel">
        <div className="form">
          <h1>DEV@Deakin</h1>
          <h2>Ask a New Question</h2>
          
          
          {showSuccessMessage && (
            <div className="success-message">
              Your question has been posted successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <label id="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Start your question with how, what, why etc."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label id="description">Describe Your Problem</label>
            <textarea
              id="description"
              placeholder="Describe your problem"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="6"
              style={{ resize: 'vertical' }}
            ></textarea>
            <label id="tags">Tags</label>
            <input
              type="text"
              id="tags"
              placeholder="Please add up to 3 tags to describe what your post is abot e.g. Java"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit" className="form_btn">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;