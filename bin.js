#!/usr/local/bin/node

var ghb = require("./index")
,   args = process.argv
,   cmd = args[1]
,   confPath = args[2]
,   conf = ghb.loadConfiguration(confPath)
;

if (cmd === "help") {
  console.log([
    "gh-backup - simple tool to automate backing up data from GitHub repositories",
    "",
    "Usage: gh-backup COMMAND /path/to/configuration.json",
    "Commands:",
    "init   - initialise from a list of repositories",
    "update - check events from a Pheme instance and update the repositories that need to be",
    "help   - print this message"
  ]);
  process.exit(0);
}
else if (cmd === "init") {
  ghb.init(conf);
}
else if (cmd === "update") {
  ghb.update(conf);
}
else {
  console.error("Unknown command: " + cmd);
  process.exit(1);
}
