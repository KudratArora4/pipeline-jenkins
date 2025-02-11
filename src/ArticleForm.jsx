import React, { useState } from 'react';
import { addArticle, uploadImage } from './firestoreService'; 
import './QAForms.css'; 

function ArticleForm() 
{
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null;

    if (imageFile) 
    {
      imageUrl = await uploadImage(imageFile); 
    }

    await addArticle(title, imageUrl, abstract, articleText, tags);

    
    setShowSuccessMessage(true);

    //clear fields once article is posted
    setTitle('');
    setImageFile(null);
    setAbstract('');
    setArticleText('');
    setTags('');

    //hide the message after 9 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 9000); 
  };

  return (
    <div className="container">
      <div className="left_panel">
        <div className="text">
          <h2>Write Your Article</h2>
          <p>Share your knowledge with the DEV@Deakin community</p>
        </div>
      </div>

      <div className="right_panel">
        <div className="form">
          <h1>DEV@Deakin</h1>
          <h2>Create a New Article</h2>
          
          
          {showSuccessMessage && (
            <div className="success-message">
              Your article has been posted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label id="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label id="image">Add Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <div className='upload-container'>
            <button type="button" onClick={() => alert('Image uploaded!')} className="upload_btn">Upload</button>
            </div>
            <label id="abstract">Abstract</label>
            <textarea
              id="abstract"
              placeholder="Enter a 1-paragraph abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
              rows="4"
              style={{ resize: 'vertical' }}
            ></textarea>
            <label id="articleText">Article Text</label>
            <textarea
              id="articleText"
              placeholder="Enter Article text"
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              required
              rows="8"
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
            <button type="submit" className="form_btn">Post Article</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleForm;
