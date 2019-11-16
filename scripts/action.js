const MESSAGE_SUCCESS = "success";
const MESSAGE_ERROR = "error";

const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const setMessage = data =>
  setTimeout(() => {
    const el = document.getElementById("message");
    el.innerText = data.msg;
    el.classList.add(data.type);
  }, 500);

document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
      if (!response || (response && !response.success)) {
        setMessage({
          msg: "🚨 Error on markdown parsing",
          type: MESSAGE_ERROR
        });
        return;
      }

      copyToClipboard(response.markdown);
      setMessage({ msg: "📋 Copied to clipboard", type: MESSAGE_SUCCESS });
    });
  });
});
