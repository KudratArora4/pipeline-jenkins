import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 


const QuestionContext = createContext();


export const useQuestionContext = () => {
  return useContext(QuestionContext);
};


export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  
  
  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    const questionData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setQuestions(questionData);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <QuestionContext.Provider value={{ questions, fetchQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};
