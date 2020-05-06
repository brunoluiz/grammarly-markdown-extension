chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({
    content: document.querySelector(".ql-editor").innerHTML,
  });
});
