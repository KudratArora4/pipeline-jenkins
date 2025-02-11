import React from 'react';
import { Icon } from 'semantic-ui-react';
import './SocialIcons.css'; 

function SocialIcons () 
{
  return (
    <div className="Social-icons">
      <a href="#facebook" className="SocialIcon"><Icon name="facebook f" /></a>
      <a href="#twitter" className="SocialIcon"><Icon name="twitter" /></a>
      <a href="#instagram" className="SocialIcon"><Icon name="instagram" /></a>
    </div>
  );
};

export default SocialIcons;