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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFlNjkzMjMwYjljMjQxZWNjYWU1ZGU2ZGNiNGI4NjVhYWRkYWI1ZWFlOTE2NDY1NTAzNjA0MzU3Mzg3MTQ1ZTc0MWY3M2M2ODFjZTkzMmU2In0.eyJhdWQiOiIyIiwianRpIjoiYWU2OTMyMzBiOWMyNDFlY2NhZTVkZTZkY2I0Yjg2NWFhZGRhYjVlYWU5MTY0NjU1MDM2MDQzNTczODcxNDVlNzQxZjczYzY4MWNlOTMyZTYiLCJpYXQiOjE1MzczNDIzOTUsIm5iZiI6MTUzNzM0MjM5NSwiZXhwIjoxNTM5OTM0Mzk1LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.YqaAegLj9Dtb0pI4P8ODHxk3ynX32mDbJ3QTW_yX1vtncEC0GwhfqkQO3qsqAcP46eCiUiH8mUw_MrJ5U6N-jEUj7eT_jzNQFGKJV9DM4ibxdQPMElK5xQPuI7kQ0sl8qTgPDagPZmLwtC2E4hDVUAkFkKJ_5jU_5LaFgyJnWy6XPwOqjS1o_G-r1h33UpYLBscPpK4j-nPtn6R4l7_4XzEhB2dSmvHXSBzUNbvFNCIDwbLi_2Mh2VE4LP2F66PS7S08A0X8mGPx3wnJDuUnPURW-wS5QNWmtAg4Sn7-Tyn6l5wwTw1SmwYln4HuQqeP283uw8qX2ikduLfGNTyg8v_5LuqO_B_24opHSMxg8DOucb653qukQPZCUGHe6Hj_xZSvzlv_l52uDGakIJ8YHr-1btiWO-F41md7NnyaNy6AkQVP0Vxuqua21GbJIILoRGS9LOS6ptPamTEE2biP9ps4KIPzHWxTNeDtsAEyoc_wtulpLfvt4lEgWvzotSwaRcb9MoFlxSEtzePLcTgjMWMCpVcwzFp3co7eAKy78bxYKJ-e2WW186TUgz8uXkUk0RE2tKunP1Jxk2TTL5kRBLu7a9Pd7V9r4_JZnBR1aI8BU4EqSN9mbsj106ZpbWlH6pDh_c0ypFtBvyp9EM7EWgKJrI9KVMVs_a4xs2jDWPk'
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
