import React from 'react';
import { Menu } from 'semantic-ui-react';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item>RentItOut</Menu.Item>
      <Menu.Menu position="right">
      <Menu.Item>Rental offers</Menu.Item>
      <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
