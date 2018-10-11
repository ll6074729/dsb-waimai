'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        target:'http://api.dqvip.cc',
        secure:false,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        },
        headers :{
            'Accept':'application/json',
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI5ZDQzNjNkMGJmODc4OTg5YTEzMDI2NWQ2OGYyMDllODJkMDE1NjFlZTRkNjljZDNiMjIwYTgzYTdiZjM5MWVjYWM3ZTM5NGZhMjVjNTJhIn0.eyJhdWQiOiIyIiwianRpIjoiMjlkNDM2M2QwYmY4Nzg5ODlhMTMwMjY1ZDY4ZjIwOWU4MmQwMTU2MWVlNGQ2OWNkM2IyMjBhODNhN2JmMzkxZWNhYzdlMzk0ZmEyNWM1MmEiLCJpYXQiOjE1MzkyMzIyNzAsIm5iZiI6MTUzOTIzMjI3MCwiZXhwIjoxNTM5MzE4NjcwLCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.x74PT-ib-_JdddzIf9Q_ay75B8ZPPMNSLvQ-xEZv8tiJ3Ti5jctmaPvNI8oyB779QyYg_PTjhA9Hsd4_vNHzX4Zv_aLZQ59_hJyd7RGWn4teBnjT-G6f0-9ygfa13pSQVs3EEtl9AXnjgfMW1h9lhdLMII8GCdkG8-qb8j-RygKqN4GOVwumfMnFX0gKroYRZ9IywYJcbG61OoVduu5E8H6rxHcm2g0eK0hLkbHA7czZkUX-JcsTY2FiQriah4x7ZNFbGCMbnkM1s9c13D_lXnuHQrJAV4IIBKdsdBb-Z64S1Ooi27c3JNMwRa-rPmxkJe1pKnPrM7c1CyfFZgJ3fiMs_EzJkpwAMcJXU7LJzVWnTfypgxGsPCnIwaeTLtVkcQR3GEPTy-taC2rKGNBgOK1BPfOZoGIolo1lHdnJ9C74FIVIos-IjZFTFaaLGlN-vwqsqyw_VdN2uIfrGcJIa3j-HhsMmxqnARzW_ChDFR0rgon2qjkzKIQhWICZCW2iP_LaDTMUds7XHi-icaw5BeYBaruVw7P7rKW3_fBZjEFq0vlnE6zpC3_6-xq_JbEjE3OXMHsE0b_7SqCFtSKTvWf3u9jvVqh9xvGWm2cs4v3g1XjGEv-qTsNLxHWpGu2S9GqSaQZF2im9X_gdZQRwo7Z1sk6GoBGbgov3eb3UNiU'
        }
      }
    },

    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
