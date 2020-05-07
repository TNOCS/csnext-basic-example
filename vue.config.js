module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      symlinks: false,
      alias: {
        '@': 'src/',
        Vue: 'vue/dist/vue.esm.js'
      }
    },
    module: {      
    }
  }
};
