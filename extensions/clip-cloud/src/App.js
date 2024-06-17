import './App.css';
import { useState, useEffect } from 'react';
import Logo from './components/Logo';
import MainContext from './components/MainContent';
import Profile from './components/Profile';
import MainContent from './components/MainContent';

function App() {

  return (
    <div className="flex bg-gray-900">
      <Logo />
      <MainContent />
      <Profile />
    </div>
  );
}

export default App;
