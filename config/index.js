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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhMTc3MmMzNWFhZDg0YmZiZTEyZDhkMGEzMzFhODBlNTZjODRjODc0MmFlMGQ0NTU0NWIzYjg4YjRlZDRjYWU2ODY0YTYyMjM2MzE5YjgwIn0.eyJhdWQiOiIyIiwianRpIjoiOWExNzcyYzM1YWFkODRiZmJlMTJkOGQwYTMzMWE4MGU1NmM4NGM4NzQyYWUwZDQ1NTQ1YjNiODhiNGVkNGNhZTY4NjRhNjIyMzYzMTliODAiLCJpYXQiOjE1Mzc5MjUwOTMsIm5iZiI6MTUzNzkyNTA5MywiZXhwIjoxNTM4MDExNDkzLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.T73N31yr5HVyswhaWFktk_2u0GeTdDmPDx2P4wFXqLyMBONATg2WiB4PUDUaDpU4j3xvN1_KJQwpQRZxqztvgilQsD1dH0hbibt7wIdYrKfKiHX835uB524henwxeJxevoYr4C0Qvez8EG7fFBnQ2HlrKUgtOJz9kjI5vyVAxEC25RwkIkpunHCdEK_GAj5_0eWEWOnxVkOm-lJCZ3w6ddTg6C6TwZyGIAPHsnwTOR66qGG9LsoaC-7EApuDSHloe9HGqup8vCbDkziMNdGVTxpoQyiEopjN8M65JTUNM4xmI6OgwHsXfcx7SS5oty2zDBMeRHZ71XKkX5Iu3_HrLdMO98gthCuOcGDt9qEIrNbkDxbjkSbA8v7iK8BO3X5XICgtf8yiTvlThVa0gQbFw2knZQ6eBSPof3qnICnb2J7Cg-2JLcyiwhlEjhE4rNOfd4Xnvdhhk3CUumlHvffA3gOpuIHlmikk2idKZ_owz7f7gMDdsSgbWBWu_rzLXxPGxCaD0ztczo8BQtPp3tRokRyNRW7jCO_tMSFODjs8B70QTGip86ypWaVS3s7WET8Su6YC6NIqS0JhXj5407gw2OdzURj7ird-wQW6gaAByIBewLcOmZtky6AK6Xl1p77WHq-gwYFoYw4UeXoGy4xA1PSuZ3k03Ci-RoJ9KPKD2p0'
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
