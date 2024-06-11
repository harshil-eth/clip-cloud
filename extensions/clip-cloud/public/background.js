chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'page') {
    console.log('Page item clicked. Status:', tab.url, tab.title);
    createPopup();
  } else if (info.menuItemId === 'link') {
    console.log('Link item clicked.', tab);
  } else if (info.menuItemId === 'image') {
    console.log('Image item clicked. Image Link:', info.srcUrl, tab);
  }
});

const createPopup = () => {
  chrome.windows.getCurrent(function (currentWindow) {
    let width = Math.round(currentWindow.width * 0.2);
    let height = Math.round(currentWindow.height * 0.4);
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

chrome.runtime.onInstalled.addListener(() => {
  let contexts = ['page', 'link', 'image'];

  for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i];
    let title;

    if (context === 'page') {
      title = 'Create new bookmark';
    } else {
      title = 'Save ' + context;
    }

    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context,
    });
  }
});
