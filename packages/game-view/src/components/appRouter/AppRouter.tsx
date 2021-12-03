import React from 'react';
import { Route, Routes } from 'react-router';
import Game from '../game/Game';
import Help from '../help/Help';
import Login from '../auth/login/Login';
import SignUp from '../auth/signup/SignUp';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/help" element={<Help />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRouter;
