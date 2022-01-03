import React from 'react';
import { Route, Routes } from 'react-router';
import Game from '@ui/game/Game';
import Help from '@ui/help/Help';
import Login from '@authUi/login/Login';
import SignUp from '@authUi/signup/SignUp';
import LogOut from '@authUi/logout/LogOut';
import LeaderBoard from '@ui/leaderBoard/LeaderBoard';

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
