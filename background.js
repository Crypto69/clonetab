async function duplicateCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id !== undefined) {
    await chrome.tabs.duplicate(tab.id);
  }
}

// Toolbar button click
chrome.action.onClicked.addListener(() => duplicateCurrentTab());

// Keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === "duplicate-tab") {
    duplicateCurrentTab();
  }
});
