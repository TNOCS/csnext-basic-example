module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      symlinks: false,
      alias: {
        "@": "src/"
      }
    },
  }
};
