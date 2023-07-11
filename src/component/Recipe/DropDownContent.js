import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DropDownContent = ({
  selectedOption,
  selectedSubMenuOption,
  handleOptionClick,
  handleSubMenuOptionClick,
  handleSort,
  handleRatingSort
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: '0.99' }}></div>
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => handleOptionClick(key)}>
            <Menu.Item key="cusine">Cusine</Menu.Item>
            <Menu.Item key="dairy">Dairy</Menu.Item>
            <Menu.Item key="calorie">Calorie</Menu.Item>
            <Menu.Item key="rating">Rating</Menu.Item>
          </Menu>
        }
        icon={<PlusOutlined />}
      >
        <Button type="primary">Sort and Display</Button>
      </Dropdown>

      &nbsp;&nbsp;&nbsp;&nbsp;

      {selectedOption === 'calorie' && (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleSort(key)}>
              <Menu.Item key="high">High Calorie</Menu.Item>
              <Menu.Item key="low">Low Calorie</Menu.Item>
            </Menu>
          }
        >
          <Button>Sort by Calorie</Button>
        </Dropdown>
      )}
      {selectedOption === 'rating' && (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleRatingSort(key)}>
              <Menu.Item key="high">High Rating</Menu.Item>
              <Menu.Item key="low">Low Rating</Menu.Item>
            </Menu>
          }
        >
          <Button>Sort by Rating</Button>
        </Dropdown>
      )}
      {selectedOption === 'dairy' && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="dairy" onClick={() => handleSubMenuOptionClick('dairy')}>
                Dairy
              </Menu.Item>
              <Menu.Item key="non-dairy" onClick={() => handleSubMenuOptionClick('non-dairy')}>
                Non-Dairy
              </Menu.Item>
            </Menu>
          }
        >
          <Button>Sort by Dairy</Button>
        </Dropdown>
      )}
      {selectedOption === 'cusine' && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="indian" onClick={() => handleSubMenuOptionClick('indian')}>
                Indian
              </Menu.Item>
              <Menu.Item key="continental" onClick={() => handleSubMenuOptionClick('continental')}>
                Continental
              </Menu.Item>
              <Menu.Item key="chinese" onClick={() => handleSubMenuOptionClick('chinese')}>
                Chinese
              </Menu.Item>
              <Menu.Item key="italian" onClick={() => handleSubMenuOptionClick('italian')}>
                Italian
              </Menu.Item>
            </Menu>
          }
        >
          <Button>Sort by Cuisine</Button>
        </Dropdown>
      )}
    </div>
  );
};
export default DropDownContent;
