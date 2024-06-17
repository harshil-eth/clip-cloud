import './App.css';
import { useState, useEffect } from 'react';

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
      <div className="relative mx-8 w-1/4">
        <div className="absolute left-0 top-0 text-lg text-slate-400 hover:text-slate-300">
          clip cloud
        </div>
      </div>
      <div className="mx-8 flex min-h-screen w-1/2 items-center justify-center text-white">
        <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-slate-400 hover:text-slate-300">
            {!itemData ? 'Loading...' : itemData.title}
          </h1>
        </div>
      </div>
      <div className="relative mx-8 w-1/4">
        <div className="absolute right-0 top-0 text-lg text-slate-400 hover:text-slate-300">
          profile
        </div>
      </div>
    </div>
  );
}

export default App;
