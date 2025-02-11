import React from 'react';
import Header from '../Header';
import ImageBanner from '../ImageBanner';
import FeaturedArticles from '../FeaturedArticles';
import FeaturedTutorials from '../FeaturedTutorials';
import NewsletterSignup from '../NewsletterSignup';
import Footer from '../Footer';

function HomePage() 
{
  return (
    <div className="HomePage">
      <Header />
      <ImageBanner />
      <FeaturedArticles />
      <FeaturedTutorials />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}

export default HomePage;
