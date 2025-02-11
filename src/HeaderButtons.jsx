import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './HeaderButtons.css';

function HeaderButtons() {
  return (
    <Menu.Menu position='right'>
      <div className="header-buttons">
        
        <Link to="/newpost">
          <Button primary>Post</Button>
        </Link>
        <Link to="/findquestions">
          <Button>Find</Button>  
        </Link>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </Menu.Menu>
  );
}

export default HeaderButtons;
