import React from 'react';
import { Route, Routes } from 'react-router';
import Game from '../game/Game';
import Help from '../help/Help';
import Login from '../auth/login/Login';
import SignUp from '../auth/signup/SignUp';
import LogOut from '../auth/logout/LogOut';
import LeaderBoard from '../leaderBoard/LeaderBoard';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/help" element={<Help />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<LogOut />} />
    </Routes>
  );
};

export default AppRouter;
