import React from 'react';
import { Menu, Input } from 'semantic-ui-react';
import './Header.css';
import HeaderButtons from './HeaderButtons';

function Header() 
{
  return (
    <Menu className="header-menu">
      <Menu.Item header>DEV@Deakin</Menu.Item>
      <Menu.Item>
        <Input icon='search' placeholder='Search...' />
      </Menu.Item>
      <HeaderButtons />
    </Menu>
  );
};

export default Header;
