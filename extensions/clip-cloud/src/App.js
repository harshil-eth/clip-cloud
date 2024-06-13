import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [itemData, setItemData] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [data, setData] = useState({});

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
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
}

export default App;
