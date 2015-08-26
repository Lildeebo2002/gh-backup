
var sua = require("superagent")
,   fs = require("fs-extra")
,   pth = require("path")
,   exec = require("child_process").exec
;

exports.loadConfiguration = function (path) {
  var conf;
  try {
    conf = require(path);
  }
  catch (e) {
    throw new Error("Configuration file not found or not valid JSON at " + path);
  }
  return conf;
}

function ensureDir (dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

function fetchRepo (conf, repo) {
  var repoDir = pth.join(conf.dataDir, repo);
  if (!fs.existsSync(repoDir)) return cloneRepo(conf, repo);
  exec("git fetch", { cwd: repoDir }, function (err) {
    if (err) return console.error("Error fetching " + repo + " inside " + repoDir + ": " + err);
    console.log("Updated " + repo + " in " + repoDir);
  });
}

function cloneRepo (conf, repo) {
  var repoDir = pth.join(conf.dataDir, repo);
  if (fs.existsSync(repoDir)) return fetchRepo(conf, repo);
  exec("git clone --mirror https://github.com/w3c/" + repo + ".git " + repoDir, function (err) {
    if (err) return console.error("Error cloning repository: " + repo + ", " + err);
    console.log("Cloned " + repo + " to " + repoDir);
  });
}

// set up all known public repositories
exports.init = function (conf) {
  if (!conf.dataDir) throw new Error("Missing configuration field: dataDir.");
  ensureDir(conf.dataDir);
  sua.get("https://api.github.com/orgs/w3c/repos?type=public")
      .accept("json")
      .end(function (err, res) {
        if (err) return console.error("Error setting up: " + err);
        res.body
            .map(function (it) { return it.name; })
            .forEach(function (it) { cloneRepo(conf, it); })
      })
}

exports.update = function (conf) {
  // - update() will hit Pheme (using a configured URL) at a specific endpoint (which needs to be added
  //  there) that lists all events that can justifyably cause an update
  // - if there are new repos, they get added
  // - if there are deleted repos, we don't care
  // - if there are changes to repos, git fetch gets to run inside the appropriate repoDir

}
