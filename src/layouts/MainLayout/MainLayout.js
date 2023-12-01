import React from 'react';
import { Outlet } from 'react-router-dom';

import { SideBar } from '../../components/SideBar';
import { Header } from '../../components/Header';

export const MainLayout = ({ children }) => {
  return (
    <div className="main-container">
      <SideBar />
      <div className="main-content">
        <div className="main-content__inner">
          <Header />
          <main>
            {children}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
