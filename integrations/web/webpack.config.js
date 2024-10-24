const path = require("path");

module.exports = {
  mode: 'production',
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "telemetric.bundle.js",
    library: {
      name: "Telemetric",
      type: "umd",
      umdNamedDefine: true
    },
    globalObject: "this",
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    }
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
