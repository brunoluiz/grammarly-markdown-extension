chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({
    title: document.querySelector("input[data-name=title-input]").value,
    content: document.querySelector(".ql-editor").innerHTML,
  });
});
