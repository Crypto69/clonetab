# CloneTab

A minimal Chrome extension that duplicates the current tab — via a toolbar button or a keyboard shortcut.

Chrome can already duplicate a tab through the right-click menu, but there's no keyboard shortcut for it out of the box. This adds one.

## Features

- **Toolbar button** — click the icon to duplicate the active tab.
- **Keyboard shortcut** — `Ctrl+Shift+K` (`Cmd+Shift+K` on macOS) by default.
- **Rebindable** — the options page links straight to Chrome's shortcut settings.
- **No permissions** — the manifest requests none. The extension acts only on the tab you're looking at, only when you ask it to.
- **No network access, no data collection, no content scripts.**

## Install

The extension isn't on the Chrome Web Store, so load it unpacked:

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the repository folder.

The icon appears in the toolbar. You may need to pin it via the puzzle-piece menu.

## Changing the shortcut

Chrome only allows extension shortcuts to be edited on its own settings page. Either:

- Open the extension's **Options** (right-click the icon → Options) and click **Change shortcut…**, or
- Go to `chrome://extensions/shortcuts` directly and find **CloneTab**.

If the default combination is already claimed by another extension, Chrome leaves the shortcut unset — the options page will show `not set`. Assign a free combination there.

## How it works

The whole extension is about twenty lines. A service worker listens for the two entry points and calls the same function:

```js
async function duplicateCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id !== undefined) {
    await chrome.tabs.duplicate(tab.id);
  }
}
```

`chrome.tabs.duplicate` needs no `tabs` permission when invoked from a user gesture on the active tab, which is why the manifest's permission list is empty.

### Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Manifest V3 config — action, command, options page, icons |
| `background.js` | Service worker; handles the toolbar click and the shortcut |
| `options.html` | Options page showing the current shortcut |
| `options.js` | Reads the active shortcut, links to Chrome's settings |
| `icons/` | 16/32/48/128px toolbar and store icons |

## Known limitations

- Chrome does not permit extensions to act on internal pages, so duplicating a `chrome://` tab or the Web Store will silently do nothing.
- Duplicated tabs open next to the original, inheriting Chrome's default placement — this isn't configurable.

## License

[MIT](LICENSE)
