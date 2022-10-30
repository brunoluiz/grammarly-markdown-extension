chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const title = document.querySelector("[data-name=header-title-input]");
  if (!title) {
    return sendResponse({ error: "Error while getting the title" });
  }

  const content = document.querySelector(".ql-editor");
  if (!content) {
    return sendResponse({ error: "Error while getting the content" });
  }

  return sendResponse({
    title: title.textContent,
    content: content.innerHTML,
  });
});
