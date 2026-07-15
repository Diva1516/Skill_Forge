import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import Goals from '../pages/Goals';
import Roadmaps from '../pages/Roadmaps';
import Explore from '../pages/Explore';
import Quiz from '../pages/Quiz';
import Interview from '../pages/Interview';
import Flashcards from '../pages/Flashcards';
import DailyChallenge from '../pages/DailyChallenge';
import Achievements from '../pages/Achievements';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      
      <Route path="/app" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="roadmaps" element={<Roadmaps />} />
        <Route path="explore" element={<Explore />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="interview" element={<Interview />} />
        <Route path="flashcards" element={<Flashcards />} />
        <Route path="daily" element={<DailyChallenge />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="goals" element={<Goals />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* 404 Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
