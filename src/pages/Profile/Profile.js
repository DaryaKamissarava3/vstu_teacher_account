import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import personPhoto from '../../assets/images/personPhoto.svg';
import penIcon from '../../assets/images/profileIcons/penIcon.svg';
import lockout from '../../assets/images/profileIcons/Lock-open.svg';
import achievement1 from '../../assets/images/profileIcons/achievement1.svg';
import achievement2 from '../../assets/images/profileIcons/achievement2.svg';
import achievement3 from '../../assets/images/profileIcons/achievement3.svg';

import './style.css';

export const Profile = () => {
  const dispatch=useDispatch();

  const userName = useSelector((state) => state.auth.userInfo.fio);
  const userToken=useSelector((state)=>state.auth.userToken);


  return (
    <>
      <div className="profile">
        <div className="profile-block">
          <div className="profile-block__inner">
            <img className="profile__img" src={personPhoto} alt="person photo"/>
            <h2 className="profile__name">{userName}</h2>
            <Link to="/edit-profile" className="sidebar-button active">
              <div className="button-content">
                <img src={penIcon} alt="Button icon" className="button_icon"/>
                <span className="button_text">Редактировать профиль</span>
              </div>
            </Link>
            <Link to="/edit-profile" className="sidebar-button">
              <div className="button-content">
                <img src={lockout} alt="Button icon" className="button_icon"/>
                <span className="button_text">Пункт меню</span>
              </div>
            </Link>
            <Link to="/edit-profile" className="sidebar-button">
              <div className="button-content">
                <img src={lockout} alt="Button icon" className="button_icon"/>
                <span className="button_text">Пункт меню</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="profile-block greeting">
          <div className="name">
            <h2>Зравствуйте, {userName}!</h2>
            <p>Сегодня - Понедельник, 28 августа 2022</p>
          </div>
          <div className="achievements-block">
            <img className="achievement-icon" src={achievement1} alt="Achievement icon"/>
            <img className="achievement-icon" src={achievement2} alt="Achievement icon"/>
            <img className="achievement-icon" src={achievement3} alt="Achievement icon"/>
          </div>
        </div>
        <div className="profile-block notifications">
          <div className="notifications-block">
            <div className="notification-block__header">
              <h3>Уведомления</h3>
              <p className="notifications-show-all">Посмотреть все</p>
            </div>
            <div className="notification-block__item">
              <h4 className="item__header">Admin, 28.08.22</h4>
              <p>Таким образом, современная методология разработки способствует повышению качества новых предложений.
                Предварительные выводы неутешительны: семантический.</p>
            </div>
            <div className="notification-block__item">
              <h4 className="item__header">Admin, 28.08.22</h4>
              <p>Таким образом, современная методология разработки способствует повышению качества новых предложений.
                Предварительные выводы неутешительны: семантический.</p>
            </div>
            <div className="notification-block__item">
              <h4 className="item__header">Admin, 28.08.22</h4>
              <p>Таким образом, современная методология разработки способствует повышению качества новых предложений.
                Предварительные выводы неутешительны: семантический.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
