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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVjNDcyZGEzYzdiOTlhN2Y5NGUyZmFkYzFhY2I3NjQ5NTZmZjJhMTBkNTJmZmNlMzdmYWExMTg2ZDMwMDVlODliOTU4MWM1ODJiM2RmODgzIn0.eyJhdWQiOiIyIiwianRpIjoiNWM0NzJkYTNjN2I5OWE3Zjk0ZTJmYWRjMWFjYjc2NDk1NmZmMmExMGQ1MmZmY2UzN2ZhYTExODZkMzAwNWU4OWI5NTgxYzU4MmIzZGY4ODMiLCJpYXQiOjE1Mzg5NzEzMzcsIm5iZiI6MTUzODk3MTMzNywiZXhwIjoxNTM5MDU3NzM3LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.gD3ZoDBsfves_sw_zLwDMkKdyU4gvbkQoqXdFHiIBo6HHg3Zc5FN9ckRwonviuzRJay9molDq4ei7MXzgfEQiRBqItFuBqVH2zZvWDu1Khqn2nWFREBz-47eI65nuAdlErKKrDEbfFccP7oZYnpEGKJiDCWEhbGpISYah8dYb6f84JMLFqy4VpIo6rsZBHRWXTkSd1ziDKIa_xXvODsH86XTPC68VTBA9aDnRri2pI2OY2porRpcDFdj75haZOe9BDUO3iBDoY2kw556_L1yc4UkDYSwbngWLPzbfJeg30iatAv9ZA6SJ1qcjW4vQlkel1SQblUUKH-d22ga_pID17DIPo0ViJdYDdroGlzl9DJojwiPi_cjoGao1KX4-YscQeBXh0UQMGz5rwGa588G8712zpFNgfJNraf1Q1ypJn9jMI5k4Cb60vATu74jOjvWvz0-GQdeZremNtEHtFGasEm0kg76NpdG_ADaADtdUFlUMBp40mhdaupNXLxZ0JwvtL5cUNLdPdLEnFkYSR7MzrVihjSjdwEGnrWjj82fWifRAT71Y5K7TD3nH5EFIlgQlLvi1m-A4Dsbk7eagNKl9l-QNRVUXF9UDLdKXr_jJ882BVjJIvjOwHFbyBu_prRw6jfaRX9aG5hgNfGL5IRYEOSk6tWiiHBhmHxYCIc-Qmc'
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
