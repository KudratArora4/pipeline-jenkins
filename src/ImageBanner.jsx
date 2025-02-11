import React from 'react';
import { Image } from 'semantic-ui-react';
import './ImageBanner.css';

function ImageBanner() 
{
  return (
    <div className="ImageBanner">
      <Image src='https://picsum.photos/1200/400' fluid alt='ImageBanner'/>
      <div className="hover-text">DEV@DEAKIN</div>
    </div>
  );
};

export default ImageBanner;