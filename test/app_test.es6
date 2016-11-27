const Application = require("spectron").Application;
const assert = require('power-assert');
const path = require("path");

const isWindows = process.platform === "win32";
const ext = isWindows ? ".cmd" : "";
const electronPath = path.join(__dirname, "..", "node_modules", ".bin", "electron" + ext);
const appPath = path.join(__dirname, "..");

const app = new Application({
  path: electronPath,
  args: [appPath, 'HELLO']
});

app.start().then(()=>{
  return app.browserWindow.isVisible();
}).then((isVisible)=>{
  assert(isVisible === true);
})
.then(()=>{
  return app.client.getTitle();
}).then((title)=>{
  assert(title == "Example");
})
.then(()=>{
  return app.client.getText("button");
}).then((text)=>{
  assert(text === "HELLO");
})
.then(()=>{
  console.info("Test Success");
  return app.stop();
}).catch((error)=>{
  console.error("Test failed", error.message);
  return app.stop();
});
