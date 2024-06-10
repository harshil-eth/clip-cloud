chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {
  if (info.menuItemId === 'radio') {
    console.log('Radio item clicked. Status:', info.checked);
  } else if (info.menuItemId === 'checkbox') {
    console.log('Checkbox item clicked. Status:', info.checked);
  } else {
    console.log('Standard context menu item clicked.');
  }
}

chrome.runtime.onInstalled.addListener(function () {
  let contexts = [
    'page',
    'selection',
    'link',
    'editable',
    'image',
    'video',
    'audio',
  ];

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
