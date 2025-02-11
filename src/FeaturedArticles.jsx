import React from 'react';
import { Card } from 'semantic-ui-react';
import CardComponent from './CardComponent';
import ButtonComponent from './ButtonComponent';
import { faker } from '@faker-js/faker';
import './FeaturedArticles.css';

const articles = Array.from({ length: 3 }, () => 
  ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  meta: faker.person.fullName(),
  image: `https://picsum.photos/200/150?random=${Math.floor(Math.random()* 1000)}`,
  rating: Math.floor(Math.random()*5)+ 1
}));

function FeaturedArticles() 
{
  return (
    <div className="featured-articles">
      <h1>Featured Articles</h1>
      <Card.Group itemsPerRow={3}>
        {articles.map((article, index) => (
          <CardComponent
            key={index}
            title={article.title}
            description={article.description}
            meta={article.meta}
            image={article.image}
            rating={article.rating}
          />
        ))}
      </Card.Group>
      <ButtonComponent text="See all articles" />
    </div>
  );
}

export default FeaturedArticles;