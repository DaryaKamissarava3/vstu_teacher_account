import React from 'react';
import { useSelector } from 'react-redux';

import { Search } from '../Search';

import eyeIcon from '../../assets/images/headerIcons/Eye.svg';
import bellIcon from '../../assets/images/headerIcons/Bell.svg';
import avatarIcon from '../../assets/images/headerIcons/img-human.svg';

import './style.css';
import {shortenName} from '../../assets/utils/functions';

export const Header = () => {
  const isAuthorized = useSelector((state) => state.auth.success);
  const userName = useSelector((state) => state.auth.userInfo);

  return (
    <>
      {!isAuthorized ?
        <header className="header auth">
          <h2 className="header-title">Личный кабинет преподавателя УО «ВГТУ»</h2>
        </header>
        :
        <header className="header main">
          <div className="header-block">
            <Search
              blockClass="header-search-block"
              inputClass="header-search__input"
              iconClass="header-search__icon"
            />
          </div>
          <div className="header-block notification-block">
            <div className="block__item">
              <img className="item__icon" src={eyeIcon} alt="icon"/>
            </div>
            <div className="block__item">
              <img className="item__icon" src={bellIcon} alt="icon"/>
            </div>
            <div className="block__item">
              <img className="block__img" src={avatarIcon} alt="Avatar icon"/>
              <div>
                <p>{shortenName(userName.fio)}</p>
              </div>
            </div>
          </div>
        </header>
      }
    </>
  );
};
