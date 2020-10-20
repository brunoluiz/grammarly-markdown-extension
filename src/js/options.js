// Saves options to chrome.storage
function save_options() {
  var linkStyle = document.getElementById('turndown-linkSyle').value;
  chrome.storage.sync.set({
    linkStyle: linkStyle
  });
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    linkStyle: "referenced"
  }, function(items) {
    document.getElementById('turndown-linkSyle').value = items.linkStyle;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
