chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("oi");
  sendResponse({
    content: document.querySelector(".ql-editor").innerHTML
  });
});
