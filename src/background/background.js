console.log("background script");

chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    id: "insert",
    title: "Fact check",
    type: "normal",
    contexts: ["selection"],
  });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let checked = info.checked;
  let editable = info.editable;
  let mediaType = info.mediaType;
  let menuItemId = info.menuItemId;
  let pageUrl = tab.url;
  let selectionText = info.selectionText;
  let parentMenuItemId = info.parentMenuItemId;
  let wasChecked = info.wasChecked;
  console.log(tab)
  if (info.menuItemId === "insert") {
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html"), // Path to your popup HTML file
      type: "popup",
      width: 500,
      height: 800,
    });
  }
  console.log("window created");
  setTimeout(() => {
    chrome.runtime.sendMessage({
      menuItemId,
      selectionText,
      pageUrl,
    });
  }, 500);
});
