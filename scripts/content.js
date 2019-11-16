const turndownService = new TurndownService({
  headingStyle: "atx",
  linkStyle: "referenced",
  bulletListMarker: "-",
  br: ""
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  try {
    const markdown = turndownService.turndown(
      document.querySelector(".ql-editor").innerHTML
    );
    sendResponse({ markdown, success: true });
  } catch (err) {
    sendResponse({ success: false });
  }
});
