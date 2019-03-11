const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})

module.exports = {
  lintOnSave: true,
  baseUrl: process.env.VUE_BASE_URL || '/',
  productionSourceMap: false,
  configureWebpack: {
    module: {
      // Fix for flot resize
      rules: [
        ...([createLintingRule()]),
        {
          test: /jquery\.flot\.resize\.js$/,
          use: 'imports-loader?this=>window'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  transpileDependencies: [
    'resize-detector' // vue-echarts
  ]
}
