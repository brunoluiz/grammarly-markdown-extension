import * as TurndownService from "turndown/lib/turndown.browser.umd.js";

import "../css/popup.css";
import "../img/icon-48.png";
import "../img/icon-128.png";

const MESSAGE_SUCCESS = "success";
const MESSAGE_ERROR = "error";

const turndownService = new TurndownService({
  headingStyle: "atx",
  linkStyle: "referenced",
  bulletListMarker: "-",
  br: "",
});

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const setMessage = (data) =>
  setTimeout(() => {
    const el = document.getElementById("message");
    el.innerText = data.msg;
    el.classList.add(data.type);
  }, 500);

document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {}, function (response = {}) {
      const { content } = response;
      if (!content) {
        return setMessage({
          msg: "🚨 Error on getting content",
          type: MESSAGE_ERROR,
        });
      }

      try {
        const markdown = turndownService.turndown(content);
        copyToClipboard(markdown);
        setMessage({ msg: "📋 Copied to clipboard", type: MESSAGE_SUCCESS });
      } catch (err) {
        return setMessage({
          msg: "🚨 Error on markdown parsing",
          type: MESSAGE_ERROR,
        });
      }
    });
  });
});
