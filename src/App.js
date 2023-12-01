import React from 'react';
import {useSelector} from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom';

import {ProtectedRoute} from './routes/ProtectedRoute';

import {Login} from './pages/Login';
import {Profile} from './pages/Profile';
import {UserManual} from './pages/UserManual';

import {MainLayout} from './layouts/MainLayout';
import {TeacherSchedule} from "./pages/Schedule/TeacherSchedule";
import {StudentsSchedule} from "./pages/Schedule/StudentsSchedule";


export const App = () => {
  const isAuthorized = useSelector((state) => state.auth.success);

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route element={<ProtectedRoute isAuthorized={isAuthorized}/>}>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Profile/>}/>
          <Route path="/schedule" element={<TeacherSchedule/>}/>
          <Route path="/schedule/group/:groupName" element={<StudentsSchedule/>}/>
          <Route path="/manual" element={<UserManual/>}/>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Route>
      </Route>
    </Routes>
  );
}
