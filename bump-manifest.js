const fs = require("fs");
const manifest = require("./manifest.json");

manifest.version = process.argv[2];

fs.writeFile("./manifest.json", JSON.stringify(manifest, null, 2), (err) => {
  if (err) throw err;
});
