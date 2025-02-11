import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import './CardComponent.css'; 

function CardComponent({ title, description, meta, image, rating }) 
{
  return (
    <Card className="custom-card">
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra className="extra-content">
        <div className="rating">
          <Icon name='star' /> {rating} Stars
        </div>
        <div className="author">
           {meta}
        </div>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
