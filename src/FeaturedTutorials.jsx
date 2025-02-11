import React from 'react';
import { Card } from 'semantic-ui-react';
import CardComponent from './CardComponent';
import ButtonComponent from './ButtonComponent';
import { faker } from '@faker-js/faker';
import './FeaturedTutorials.css';

const tutorials = Array.from({ length: 3 }, () => 
  ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  meta: `By ${faker.internet.userName()}`,
  image: `https://picsum.photos/200/150?random=${Math.floor(Math.random()* 1000)}`,
  rating: Math.floor(Math.random()*5)+ 1
}));

function FeaturedTutorials() 
{
  return (
    <div className="featured-tutorials">
      <h1>Featured Tutorials</h1>
      <Card.Group itemsPerRow={3}>
        {tutorials.map((tutorial, index) => (
          <CardComponent
            key={index}
            title={tutorial.title}
            description={tutorial.description}
            meta={tutorial.meta}
            image={tutorial.image}
            rating={tutorial.rating}
          />
        ))}
      </Card.Group>
      <ButtonComponent text="See all tutorials" />
    </div>
  );
}

export default FeaturedTutorials;