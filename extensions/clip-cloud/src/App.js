import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [itemData, setItemData] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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

  useEffect(() => {
    // Fetch active tab data
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const data = { url: tab.url, title: tab.title, type: 'page' };
      setPageData(data);
      console.log(`Fetched pageData: ${JSON.stringify(data)}`);
    });
  }, []);

  useEffect(() => {
    // Update data based on itemData and pageData
    if (pageData && pageData.url.startsWith('chrome-extension://')) {
      setData(itemData);
    } else {
      setData(pageData);
    }
  }, [itemData, pageData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="text-2xl font-bold">
          {!data ? 'Loading...' : data.title}
        </h1>
      </div>
    </div>
  );
}

export default App;
