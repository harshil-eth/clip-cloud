import './App.css';
import { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { Profile } from './components/Profile';

function App() {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    // Fetch itemData from chrome storage
    chrome.storage.local.get(['itemData'], (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      if (result.itemData) {
        setItemData(result.itemData);
        console.log(`Fetched itemData: ${JSON.stringify(result.itemData)}`);
      } else {
        console.log('Item Data not found in storage');
      }
    });
  }, []);

  return (
    <div className="flex bg-gray-900">
      <Logo />
      <div className="mx-8 flex min-h-screen w-1/2 items-center justify-center text-white">
        <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-slate-400 hover:text-slate-300">
            {!itemData ? 'Loading...' : itemData.title}
          </h1>
        </div>
      </div>
      <Profile />
    </div>
  );
}

export default App;
