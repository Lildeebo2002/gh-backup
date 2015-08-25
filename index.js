
var sua = require("superagent")
;

// here is what we want
// - configuration takes a list of either owners or repos
// - from that the init function can create a list of all repos to track (by including
//   both the repos and all the public repos from the owners).
// - configuration also has a data directory
// - init creates a subdirectory of data per owner, and inside of each of those
//    git clone --mirror repoURL repoDir
// - pheme() will hit Pheme (using a configured URL) at a specific endpoint (which needs to be added
//  there) that lists all events that can justifyably cause an update
// - if there are new repos, they get added
// - if there are deleted repos, we don't care
// - if there are changes to repos, git fetch gets to run inside the appropriate repoDir
// - all is logged

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

exports.init = function (conf) {

}
