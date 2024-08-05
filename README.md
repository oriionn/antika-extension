# Antika
A simple extension to replace video reader with a custom one for multiple sources.
If you want to selfhost the player, you can selfhost this [server](https://github.com/oriionn/antika-server).

## Compatibility
| Browser | Tested |
|---------|---------|
| Chrome  | ✅   |
| Firefox | ✅   |
| Edge    | ✅   |
| Safari  | ❌   |
| Opera   | ❌   |

### Sources
- [x] my.mail.ru
- [x] sendvid.com
- [x] streamtape.com
- [x] sibnet.ru
- [x] voe.sx
- [ ] vidmoly.to

## Installation
1. Install the extension from [Chrome Web Store](https://google.com/?q=Not%20available) or [Firefox Add-ons](https://google.com/?q=Not%20available).
2. Open the extension settings and if you want to disable a source, uncheck the box next to it.
3. Enjoy!

## Development
1. Clone the repository.
2. Rename `manifest.chrome.json` or `manifest.firefox.json` to `manifest.json` depending on the browser you are using.
3. Load the extension in your browser.
   - Firefox: Open `about:debugging`, click on `This Firefox` and then `Load Temporary Add-on...`. Select the `manifest.json` file.
   - Edge: Open `edge://extensions/`, enable `Developer mode` and click on `Load unpacked`. Select the extension directory.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
