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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkxMWJiOGY5OThhZmNkZmEzNDM0MmJiNzlmYzdhNTgwMWU0ODFjZDczY2M1NzY0NmE1ZTUyZmIwMmI1N2ZhYzk5MDY2MzZmNjI0YTA3MzIzIn0.eyJhdWQiOiIyIiwianRpIjoiOTExYmI4Zjk5OGFmY2RmYTM0MzQyYmI3OWZjN2E1ODAxZTQ4MWNkNzNjYzU3NjQ2YTVlNTJmYjAyYjU3ZmFjOTkwNjYzNmY2MjRhMDczMjMiLCJpYXQiOjE1MzgxODY4NDIsIm5iZiI6MTUzODE4Njg0MiwiZXhwIjoxNTM4MjczMjQyLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.xKzVprUBkswFjBJXUCR_QDzQGleHY-LeEmrmdxmZ6RcQ9RigBsSZcMOq-hyhNSSYKu3Ev4nw5c_P7toPCSOagleoGRy23NnvVqWAXNoe6NkK7Zn5DkFJ9H9SZcOHEovKxSckZngkX22o_BxmgLBA6hjfN7q5BqbJe1CVkYRqPn6IA8ESj8NFQBd5yE_WzaK6OIIh4WguWWUuMkO-6RsXCs1ZCFPS-gmq-saZBh0NipXShdoYPOskrKPAGyzOT458I6_agI_rUz-MsJbPTaiixJl-THe25LCpOIA2Ep9WW_mDCQ45173X_iC2NBZxbiRUEUqgSSEuQi61hhlt0YXjTRyTT13Uk6CxNDayD_K7Gl9noO-zakNaxUYpA42nLgE1xq9Ivz8PSjnHq0_g1inHP4mHswQIGZpdiDb8TQRnKsMavj6WZkUjFvfTZBh2GFzHjXmcy-FB1nZUpt7ApuQ6rk_1Vv272ahPCzDqJe4kLOZAUjODRSCDjH95sEAgU5MCVRVS1Dy4vt4Mc3w2owAm2nafHg1hGm6xRgiVERin6XtNrF0fx31meKrPqha2Epn8w_EQh__Rcn8nKjAkvc1Ru2Xc0DKcLPZnitKY4FGUANMPSv7Yg70lJwRxtkkxp32rnDkRT2rYBHsiTpLuq_KXyvF9HOmEoYwIzYqEuivU7MQ'
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
