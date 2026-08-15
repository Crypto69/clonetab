async function showCurrentShortcut() {
  const commands = await chrome.commands.getAll();
  const cmd = commands.find((c) => c.name === "duplicate-tab");
  const el = document.getElementById("current");
  el.textContent = cmd && cmd.shortcut ? cmd.shortcut : "not set";
}

document.getElementById("edit").addEventListener("click", () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

showCurrentShortcut();
