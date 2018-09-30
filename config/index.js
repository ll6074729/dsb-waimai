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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3ZTE0ZWRkODZiNjRkYmY5ODAyODM1ODNjNmRkOGMyMWMxZGYxYWVjNDI3N2VkNDhhZGJmZGJkNzdhNjA4ZjAyMTQ0MzNiNDUyZTM1MjRhIn0.eyJhdWQiOiIyIiwianRpIjoiODdlMTRlZGQ4NmI2NGRiZjk4MDI4MzU4M2M2ZGQ4YzIxYzFkZjFhZWM0Mjc3ZWQ0OGFkYmZkYmQ3N2E2MDhmMDIxNDQzM2I0NTJlMzUyNGEiLCJpYXQiOjE1MzgyOTk2NTgsIm5iZiI6MTUzODI5OTY1OCwiZXhwIjoxNTM4Mzg2MDU3LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.yFQH6h7vRUqZ8ecka15vVY2AemOUc8mdkqW9aGUDKNfEr-eUZjrDsMw4ukVCzr1BMJcf89E3c7qI5OmUUWkSnxVnCcgvY9O09IugzSjNznznCsIglHKVVSC8AGDmeAC1h8fWrrMpTuYfspUIqG698KylwOgARtojQWdXDevKbPgs1Wz1kawVzuppyJqeHhB0uX-gM5BTqmsB-nEyqOCe7pfM35Ycu2-f0_AuN38VY9Ei28MYzAsrECs5jpYycYHiH9Nf6SmKoueeOlc6DLEwHmRufdCtRFtQJGRb8JYde8ahlJb7LWIE1rjbLNI9-HQE153FMg2pXzU55mn6E5fAMrpbtsLw3VKFIhPyXg6y2nGTaowEK9xHyGS8_Dy0RBxptgy_FHHLRWyg8yiDvTeasx2Pp3wfKJ-Cr0O7Z9PrploD8JpdgN7TJ0mGiR4OFAV3wcM6Eyb9KaeNLchypwaWnTte4BLIRlS0iWthsoKtVxFInvpi5cpvSTn1X7JAiyAoLqS1WNWUK9NCicptirQH2yctqefvTrfbDyfxj7i4mWdEIxhX19fyj_3Z5a_uwFQ_C5JjmD4COIM0DYwGtvUWzO3HmXXagU7Fc2rRz5UzcQHHvTvH_iGnQ6vUkPRIr-aQ9GKmgCVZBNsmfA2aN6ubzjBsztc7YdP-Dy8nLGTZpRw'
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
