import React from 'react';
import { useDispatch } from 'react-redux';
import _ from 'underscore';
import { Button, Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import { selectUSState } from './covidGraphSlice';


export function SubsetPicker() {
  const dispatch = useDispatch();

  // TODO (cato) Find a condensed way to display all states
  const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'];
  const handleMenuClick = function(e) {
    dispatch(selectUSState(e.key));
  };
  const menuItems = _.map(states, stateName => {
    return (
      <Menu.Item key={stateName}>
        {stateName}
      </Menu.Item>
    );
  });

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>Select A State</Button>
    </Dropdown>
  );
}
