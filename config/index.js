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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM5Nzc4YTk5N2JiODAwMTBkNGI3NDk4NjliMWVlOGU0YmM5MzY4MzcxMjBjYTU5ZmM3OTZiYjU3MzAxZWNjZWE3OTZmNDEyMjQ2NzdmZGRiIn0.eyJhdWQiOiIyIiwianRpIjoiYzk3NzhhOTk3YmI4MDAxMGQ0Yjc0OTg2OWIxZWU4ZTRiYzkzNjgzNzEyMGNhNTlmYzc5NmJiNTczMDFlY2NlYTc5NmY0MTIyNDY3N2ZkZGIiLCJpYXQiOjE1Mzg0OTY5OTUsIm5iZiI6MTUzODQ5Njk5NSwiZXhwIjoxNTM4NTgzMzk1LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.TyNxUguL6QS97NvQ6VB7BfGNhdkfyb_xdR1_VLZsBTLDgjQdcTuMj3s4LFFLgbFz-YdGHi6op0Tu3fbTJSVtmdBBpfX1HJ7Doa2HsqTMyFvlSL1FPHVES44GTPYmjeSlltl_1dyJqUOdE2HYgTVYpX2lwnDZn9Wqpbuagl0nqBOUxy9xraB_S0Rt93PgRMqOyOvFd9NIEwrXcxbgfCkY6lw4DRkytGMGCQkkrOhV0oo5YrGsAI_8yf1o5l2TV-Zp9O36D3OCG5blg7_LBCW7j5d5CqXOs6z5S6bRpizZhWipBQ-UxO_-Mr540pGUic5NR949WEwPHd0fWmZtU2wogXk1fs_pLB-CN56oHShSPSGZMC5aA30TTK4iV8BralfdLVMK-Va_YtTqLrC4cadudFhOQl2LUvUl9oARvsmeeq4TnzYU3ZY8aC6wbGZuYAmwnfbRu_NukD6WRb3IY6P1Ous3i9fRJqNtj1JIsXg3drBBObAPZfj3wG2TrEciFf5idCcsB4hKhZdrcjWqF6iCRL-d9Hp3dVgK9DtDkGDmmywIZqObRc032a5ECjEt8nvhYMk6gjyhI3E2SPlDHni4w-E_VGnWvCbDtO1IO9NeGQovTljrJPxggnYffOS0v8DG89cFfpDw7BgpOmXSKlbwn2tAgo-WqZxw83DhkJJll2A'
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
