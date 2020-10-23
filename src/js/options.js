// Saves options to chrome.storage
const saveOptions = () => {
  const linkStyle = document.getElementById("turndown-linkSyle").value;
  chrome.storage.sync.set({
    linkStyle: linkStyle,
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get(
    {
      linkStyle: "referenced",
    },
    (items) => {
      document.getElementById("turndown-linkSyle").value = items.linkStyle;
    }
  );
};
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
