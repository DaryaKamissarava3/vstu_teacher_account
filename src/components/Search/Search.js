import React from 'react';

import searchIcon from '../../assets/images/headerIcons/searchIcon.svg';
import './style.css';

export const Search = ({ blockClass, inputClass, iconClass }) => {
  return (
    <div className={blockClass}>
      <input className={inputClass} type="text" placeholder="Поиск по сайту..."/>
      <img className={iconClass} src={searchIcon} alt="loop icon"/>
    </div>
  );
};
