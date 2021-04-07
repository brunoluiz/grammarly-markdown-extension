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

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {}, (response = {}) => {
      chrome.storage.sync.get(
        {
          turndown: {},
          escapeBackticks: true,
        },
        ({ turndown, escapeBackticks }) => {
          const turndownService = new TurndownService(turndown);
          turndownService.addRule("h1", {
            filter: ["h1"],
            replacement: (content) => `## ${content}\n`,
          });

          turndownService.addRule("h2", {
            filter: ["h2"],
            replacement: (content) => `### ${content}\n`,
          });

          const { content, title, error } = response;
          if (!content) {
            const msg = error ? `🚨 ${error}` : `🚨 Unexpected error`;
            return setMessage({ msg, type: MESSAGE_ERROR });
          }

          try {
            let markdown = "";
            markdown += `# ${title}\n\n`;
            markdown += turndownService.turndown(content);
            if (!escapeBackticks) {
              markdown = markdown.replaceAll("\\`", "`");
            }

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
