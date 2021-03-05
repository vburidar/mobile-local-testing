const localtunnel = require("localtunnel");
const fs = require("fs");
const BACKEND_FOLDER = "../my-backend";
const FRONTEND_FOLDER = "../my-app";
const ENV_TUNNEL_FILE = ".env.tunnel";
const ENV_FILE = ".env";
const FRONTEND_URL = "frontend_url";
const BACKEND_URL = "backend_url";

(async () => {
  const tunnelFrontend = await localtunnel({ port: 3000 });
  const tunnelBackend = await localtunnel({ port: 8000 });
  console.log(
    "tunnel created on port 3000. Public https address=",
    tunnelFrontend.url
  );
  console.log(
    "tunnel created on port 8000. Public https address=",
    tunnelBackend.url
  );
  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  replaceInFile(
    BACKEND_FOLDER + "/" + ENV_TUNNEL_FILE,
    BACKEND_FOLDER + "/" + ENV_FILE,
    FRONTEND_URL,
    tunnelFrontend.url
  );
  replaceInFile(
    FRONTEND_FOLDER + "/" + ENV_TUNNEL_FILE,
    FRONTEND_FOLDER + "/" + ENV_FILE,
    BACKEND_URL,
    tunnelBackend.url
  );
  tunnelFrontend.on("close", () => {
    // tunnels are closed
  });
  tunnelBackend.on("close", () => {
    // tunnels are closed
  });
})();

const replaceInFile = (
  templatePath,
  destinationPath,
  stringToReplace,
  newString
) => {
  fs.readFile(templatePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const regex = new RegExp(`${stringToReplace}`);
    var result = data.replace(regex, newString);
    fs.writeFile(destinationPath, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
};
