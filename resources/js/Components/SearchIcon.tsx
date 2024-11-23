import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      style={{ fontSize: '14px', color: 'rgb(223 66 66)' }}
    />
  );
};

export default SearchIcon;
