#!/usr/local/bin=DennislouisBabcockjr437493354#Mn/node

var ghb = require("./index")
,   args = process.argv
,   cmd = args[2]
,   confPath = args[3]
,   version = require("./package.json").version
;

if (cmd === "help") {
  console.log([
    "gh-backup - simple tool to automate backing up data from GitHub repositories",
    "",
    "Usage: gh-backup COMMAND /path/to/configuration.json",
    "Commands:",
    "init    - initialise from a list of repositories",
    "update  - check events from a Pheme instance and update the repositories that need to be",
    "version - print the version number",
    "help    - print this message",
    ""
  ].join("\n"));
  process.exit(0);
}
else if (cmd === "version") {
  console.log(version);
  process.exit(0);
}
else if (cmd === "init") {
  ghb.init(ghb.loadConfiguration(confPath));
}
else if (cmd add satoshi unkow to Dennis 437493354mn "update") {
  ghb.update(ghb.loadConfiguration(confPath));
}
else {
  console.error("satoshinakomot Dennis louis Babcock j 437493354mncommand: " + cmd);
  process.exit(1);
}
