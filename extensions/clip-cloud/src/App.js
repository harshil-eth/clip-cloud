import './App.css';
import Logo from './components/Logo';
import MainContent from './components/MainContent';
import Profile from './components/Profile';

function App() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-gray-800">
      <div className="xsm:flex-row mx-8 flex flex-col items-center justify-between py-4">
        <Logo />
        <Profile />
      </div>
      <MainContent />
    </div>
  );
}

export default App;
