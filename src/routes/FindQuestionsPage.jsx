import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Modal } from 'semantic-ui-react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import { useQuestionContext } from '../context/QuestionContext'; 
import { Link } from 'react-router-dom';  
import './FindQuestionsPage.css';

function FindQuestionsPage() {
  const { questions } = useQuestionContext(); 
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({}); 

  useEffect(() => 
    {
    setFilteredQuestions(questions); 
  }, [questions]);

  const handleFilter = () => 
    {
    let updatedQuestions = [...questions];
    
    if (searchTerm) 
      {
      updatedQuestions = updatedQuestions.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTag) 
      {
      updatedQuestions = updatedQuestions.filter(q =>
        q.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase()))
      );
    }

    if (filterDate) 
      {
      updatedQuestions = updatedQuestions.filter(q =>
        new Date(q.createdAt.seconds * 1000).toDateString() === filterDate.toDateString()
      );
    }

    setFilteredQuestions(updatedQuestions);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterTag('');
    setFilterDate(null);
    setFilteredQuestions(questions);
  };

  const handleExpand = (id) => {
    setExpandedQuestionId(id === expandedQuestionId ? null : id);
  };

  const handleDelete = (id) => {
    setFilteredQuestions(filteredQuestions.filter(question => question.id !== id));
  };

  const openReplyModal = (questionId) => {
    setCurrentQuestionId(questionId);
    setReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setReplyModalOpen(false);
    setReplyText('');
  };

  const handlePostReply = () => {
    if (replyText && currentQuestionId) {
      setReplies(prev => ({
        ...prev,
        [currentQuestionId]: [...(prev[currentQuestionId] || []), replyText],
      }));
      closeReplyModal();
    }
  };

  return (
    <div className="find-questions-page">
      <Link to="/" className="back-home-link">
        &lt; Back to Homepage
      </Link>

      <h1>Find Questions</h1>

      <div className="filters">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          placeholder="Filter by tag..."
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          placeholderText="Select a date.."
        />
        <Button color='blue' onClick={handleFilter}>
          Apply Filters
        </Button>
        <Button color='grey' onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="question-list">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <Card
              key={question.id}
              fluid
              className={`question-card ${expandedQuestionId === question.id ? 'expanded' : ''}`}
              onClick={() => handleExpand(question.id)} 
            >
              <Card.Content>
                <Card.Header>{question.title}</Card.Header>
                <Card.Meta>{new Date(question.createdAt.seconds * 1000).toLocaleDateString()}</Card.Meta>
                <Card.Description>
                  {expandedQuestionId === question.id ? question.description : `${question.description.substring(0, 100)}...`}
                </Card.Description>
                <div className="tags">
                  {question.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </Card.Content>
              <Card.Content extra>
                <Button color='green' onClick={() => openReplyModal(question.id)}>Reply</Button>
                <Button color="red" onClick={() => handleDelete(question.id)}>Delete</Button>
              </Card.Content>

              
              {replies[question.id] && replies[question.id].length > 0 && (
                <div className="replies-section">
                  <h4>Replies:</h4>
                  <ul>
                    {replies[question.id].map((reply, index) => (
                      <li key={index}>{reply}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))
        ) : (
          <p>No questions found with the current filters.</p>
        )}
      </div>

      
      <div className="add-question-section">
        <h3>Want to ask a question?</h3>
        <Link to="/newpost" className="add-question-link">
          Click here
        </Link>
      </div>

      
      <Modal open={replyModalOpen} onClose={closeReplyModal}>
        <Modal.Header>Reply to Question</Modal.Header>
        <Modal.Content>
          <h3>{filteredQuestions.find(q => q.id === currentQuestionId)?.title}</h3>
          <textarea
            className="reply-textarea"
            placeholder="Type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </Modal.Content>
        
        <Modal.Actions>
          <Button onClick={closeReplyModal}>Cancel</Button>
          <Button color='blue' onClick={handlePostReply}>Post Reply</Button>
        </Modal.Actions>
      
      </Modal>
    </div>
  );
};

export default FindQuestionsPage;
