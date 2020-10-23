import * as TurndownService from "turndown/lib/turndown.browser.umd.js";

import "../css/popup.css";
import "../img/icon-48.png";
import "../img/icon-128.png";

const MESSAGE_SUCCESS = "success";
const MESSAGE_ERROR = "error";

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
      chrome.storage.sync.get(
        {
          headingStyle: "atx",
          linkStyle: "referenced",
          bulletListMarker: "-",
          br: "",
        },
        function (items) {
          console.log(items);
          var turndownService = new TurndownService(items);
          turndownService.addRule("h1", {
            filter: ["h1"],
            replacement: (content) => `## ${content}\n`,
          });

          turndownService.addRule("h2", {
            filter: ["h2"],
            replacement: (content) => `### ${content}\n`,
          });

          const { content, title } = response;
          if (!content) {
            return setMessage({
              msg: "🚨 Error on getting content",
              type: MESSAGE_ERROR,
            });
          }

          try {
            let markdown = "";
            markdown += `# ${title}\n\n`;
            markdown += turndownService.turndown(content);
            copyToClipboard(markdown);
            setMessage({
              msg: "📋 Copied to clipboard",
              type: MESSAGE_SUCCESS,
            });
          } catch (err) {
            return setMessage({
              msg: "🚨 Error on markdown parsing",
              type: MESSAGE_ERROR,
            });
          }
        }
      );
    });
  });
});
