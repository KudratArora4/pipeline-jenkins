import { db } from './firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 
import { storage } from './firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

//add a question
export const addQuestion = async (title, description, tags) => {
  try {
    const uniqueID = `question_${Date.now()}`;
   
    await setDoc(doc(db, 'questions', uniqueID), {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()), //tag to array
      createdAt: new Date(),
    });
    console.log("Question added successfully!");
  } catch (error) {
    console.error("Error adding question: ", error);
  }
};

//add an article
export const addArticle = async (title, imageUrl, abstract, articleText, tags) => {
  try {
    const uniqueID = `article_${Date.now()}`;
    await setDoc(doc(db, 'articles', uniqueID), {
      title,
      imageUrl,
      abstract,
      articleText,
      tags: tags.split(',').map(tag => tag.trim()), 
      createdAt: new Date(),
    });
    console.log("Article added successfully!");
  } catch (error) {
    console.error("Error adding article: ", error);
  }
};

//upload image and return the URL
export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`); 
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; 
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
};