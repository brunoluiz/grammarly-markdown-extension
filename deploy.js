const fs = require("fs");
const zipFolder = require("zip-folder");
const { REFRESH_TOKEN, EXTENSION_ID, CLIENT_SECRET, CLIENT_ID } = process.env;
const webStore = require("chrome-webstore-upload")({
  extensionId: EXTENSION_ID,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN,
});

const folderName = "dist";
// I too hate placeholders! will be attaching a sample file at the end of this writeup
const zipName = "extension.zip";

zipFolder(folderName, zipName, function (err) {
  if (err) {
    console.log("oh no! ", err);
    process.exit(1);
  }

  console.log(
    `Successfully zipped the ${folderName} directory and store as ${zipName}`
  );
  uploadZip();
});

function upload() {
  const extesnionSource = fs.createReadStream(zipName);
  webStore
    .uploadExisting(extesnionSource)
    .then((res) => {
      console.log("Successfully uploaded the ZIP");

      // call publish API on success
    })
    .catch((error) => {
      console.log(`Error while uploading ZIP: ${error}`);
      process.exit(1);
    });
}

function uploadZip() {
  // creating file stream to upload
  const extensionSource = fs.createReadStream(`./${zipName}`);

  // upload the zip to webstore
  webStore
    .uploadExisting(extensionSource)
    .then((res) => {
      console.log("Successfully uploaded the ZIP");

      // publish the uploaded zip
      webStore
        .publish()
        .then((res) => {
          console.log("Successfully published the newer version");
        })
        .catch((error) => {
          console.log(`Error while publishing uploaded extension: ${error}`);
          process.exit(1);
        });
    })
    .catch((error) => {
      console.log(`Error while uploading ZIP: ${error}`);
      process.exit(1);
    });
}
