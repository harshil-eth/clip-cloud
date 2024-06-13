// Function to handle context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let data = {};

  if (info.menuItemId === 'page') {
    data = { url: tab.url, title: tab.title, type: 'page' };
  } else if (info.menuItemId === 'link') {
    data = {
      url: info.linkUrl,
      title: info.selectionText || tab.title,
      type: 'link',
    };
  } else if (info.menuItemId === 'image') {
    data = {
      url: info.srcUrl,
      title: info.selectionText || tab.title,
      type: 'image',
    };
  }

  chrome.storage.local.set({ itemData: data }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error setting storage:', chrome.runtime.lastError);
      return;
    }

    console.log('Context menu data saved to storage:', data);
    createPopup();
  });
});

const createPopup = () => {
  chrome.windows.getCurrent(function (currentWindow) {
    let width = Math.round(currentWindow.width * 0.35);
    let height = Math.round(currentWindow.height * 0.5);
    let left = Math.round((currentWindow.width - width) / 2);
    let top = Math.round((currentWindow.height - height) / 2);

    chrome.windows.create({
      url: 'index.html',
      type: 'popup',
      width: width,
      height: height,
      left: left,
      top: top,
    });
  });
};

// Function to create context menu items
const createContextMenu = () => {
  const contexts = ['page', 'link', 'image'];

  contexts.forEach((context) => {
    let title;

    switch (context) {
      case 'page':
        title = 'Create new bookmark';
        break;
      case 'link':
        title = 'Save Link';
        break;
      case 'image':
        title = 'Save Image';
        break;
      default:
        title = 'Save';
        break;
    }

    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context,
    });
  });
};

// Event listener for extension installation
chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});
