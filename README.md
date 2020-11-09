# Grammarly to Markdown extension

🖋 Convert Grammarly to Markdown (browser extension)

## Usage

1. Open any document in Grammarly -- URL might be `https://app.grammarly.com/docs/*`
1. Click on the extension button on the toolbar
1. It will be copied to your clipboard
1. Profit 🚀

## Development

1. Check if your Node.js version is >= 6.
1. Clone the repository.
1. Run `npm install`.
1. Run `npm run start`
1. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.

It uses the [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate). It will run a webpack server, with hotreload, for your JS.
