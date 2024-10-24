const path = require("path");

module.exports = {
  mode: 'production',
  entry: "./src/telemetric.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "telemetric.bundle.js",
    library: {
      name: "Telemetric",
      type: "umd",
      export: "default"
    },
    globalObject: "this",
  }
};
