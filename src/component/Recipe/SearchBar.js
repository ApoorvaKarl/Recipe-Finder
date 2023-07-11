import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ searchValue, onSearchChange }) => {
  const handleSearch = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <Input
      placeholder="Search by ingredient..."
      value={searchValue}
      onChange={handleSearch}
      prefix={<SearchOutlined />}
      autoFocus={true}
      autoComplete="off"
      className="ant-input-affix-wrapper"
      style={{ borderRadius: '2px' }}
    />
  );
};

export default SearchBar;
