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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIwMTFjMDUxYTRlNjE5ZDQxM2E1MGQxM2FkNjkwZmRhYWQ4YWIwN2NkNzkxOTY0NjNjZDg4ODYyOTgyZDJlMjgxZGI2NGEwMjkzMzk0YzVhIn0.eyJhdWQiOiIyIiwianRpIjoiYjAxMWMwNTFhNGU2MTlkNDEzYTUwZDEzYWQ2OTBmZGFhZDhhYjA3Y2Q3OTE5NjQ2M2NkODg4NjI5ODJkMmUyODFkYjY0YTAyOTMzOTRjNWEiLCJpYXQiOjE1Mzc4Mzg1MjIsIm5iZiI6MTUzNzgzODUyMiwiZXhwIjoxNTM3OTI0OTIyLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.xgiUskQ3BuS4GMNf575zG8v1xta5mLM3th960wMZk8t2l5iV3BvhlfrSnLL8_rAPk2kfkiW06VWKTn6kEIrJ_NnH8uXpYQMjYJUTqerSytPZTamXwWN9pKa35HjSU2ObrYBGX59FcheypeLkeFSLIgv6zmQ7E7AUDNZgZB3JTlf7zZmewJEvOqKGEnEXKpRdA8GmXOZDR54E-XNm188Jq6UliX62lGhoEMxXEeCzayTpoHzv9ARdoMzAEAK3fMobBiKknZaTqPTCRc0qTbiMU6gNIdd0PukIz-kzWWxCK3oZNqFDxxbG6p2cAfAYKGZtBXgST05QEvlAnbfIQP1bhpIyJhr533m6fLulakBAYn-7wJHBtgU5fiRLAAFRWfCB_1hT2XWegmGLGWEderTWXzwnjNARltf72zqt8b5FhA2k8cyN6qCSMuipZvoNnBm-HiQ1st4tOxdO9OXRn5hibbK4ci7cx-ltKyYQCWiTJX38PIDXaJjLXB7qVEkXF2Tcv_UqOQUWDlRC_pIs2nu4kUayAQJw4PbSEpkfA68-AxpVsJbRIr9J4Z-iz55bAk8AZRV95ZcTm15v5yyPbYkBP4XsnnMH9br8gFh8vnOVB6J2DptXoQQdnNyOBwDoF7BhXhAucCVWnvzerrtoIVxtDOrA8FTDF_2R6TsPpzB9PJo'
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
