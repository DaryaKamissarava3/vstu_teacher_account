import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {NavigationButton} from '../NavigationButton';

import {persistor} from '../../store';
import {logoutUser} from '../../store/authSlice';
import {clearSchedule, fetchTeacherSchedule} from '../../store/scheduleSlice';
import {clearWeekData} from '../../store/weekDataSlice';

import userIcon from '../../assets/images/buttonIcons/User.svg';
import calendarIcon from '../../assets/images/buttonIcons/Calendar.svg';
import statisticIcon from '../../assets/images/buttonIcons/Chart.svg';
import attendanceIcon from '../../assets/images/buttonIcons/Component.svg';
import debtsIcon from '../../assets/images/buttonIcons/Receipt.svg';
import userManualIcon from '../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from '../../assets/images/buttonIcons/Logout.svg';
import personIcon from '../../assets/images/vector.svg';
import {fetchWeekDay, fetchWeekNumber, fetchWeekName} from '../../store/weekDataSlice';


import './style.css';

export const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userToken = useSelector((state) => state.auth.userToken);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearSchedule());
    dispatch(clearWeekData());
    persistor.purge();
    navigate("/login");
  };

  const handleScheduleInfo = () => {
    dispatch(fetchTeacherSchedule(userToken));
    dispatch(fetchWeekDay(userToken));
    dispatch(fetchWeekNumber());
    dispatch(fetchWeekName());
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-title-block">
          <img className="sidebar-logo" src={personIcon} alt="Person icon"/>
          <p>
            Личный кабинет преподавателя<br/> УО "ВГТУ"
          </p>
        </div>
        <NavigationButton to="/" icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
        <NavigationButton to="/schedule" clickFunction={handleScheduleInfo} icon={calendarIcon} text="Расписание"
                          isActive={location.pathname === '/schedule'}/>
        <NavigationButton to="/manual" icon={userManualIcon} text="Руководство пользователя"
                          isActive={location.pathname === '/manual'}/>
        <NavigationButton to="/login" clickFunction={handleLogout} icon={logoutIcon} text="Выйти из профиля"/>
        {/*<button onClick={handleLogout} className="sidebar-button">*/}
        {/*  <div className="button-content">*/}
        {/*    <img src={logoutIcon} alt="Button icon" className="button_icon"/>*/}
        {/*    <span className="button_text">Выйти из профиля</span>*/}
        {/*  </div>*/}
        {/*</button>*/}
      </div>
    </>
  );
};
