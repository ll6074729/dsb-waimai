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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJlNzY2NTVmNTJlNmRlM2I1ZGVjODVjZmNhMDc1MjU3MWVhMTViOTc4YjBiYjI5MjI0MWY5ODY2N2Y4Y2ZiNGRmMzFkNGYyOTJjY2M0ZDEwIn0.eyJhdWQiOiIyIiwianRpIjoiMmU3NjY1NWY1MmU2ZGUzYjVkZWM4NWNmY2EwNzUyNTcxZWExNWI5NzhiMGJiMjkyMjQxZjk4NjY3ZjhjZmI0ZGYzMWQ0ZjI5MmNjYzRkMTAiLCJpYXQiOjE1Mzk0OTczOTksIm5iZiI6MTUzOTQ5NzM5OSwiZXhwIjoxNTM5NTgzNzk5LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.qsOYF86YWcAf5gOAXWrH5jkdO2vgF3Rt1Zzw-ihi727SyfudSHrBTxnlZxAmbs0njD48fkhUmWeQpuFQtpLNLoxFfA81c6P-HlQoyT1EZ6CzPgvlU5cn6EwYpHIxcmBbIeAvX3Ua5m7cdZ3xQQXCSMwcv1-GY-b6FTTCz7eTW9GLe1a11Jd1SRJ5ksq0fyQu64aAt9pg4HLZLgPJa_xBzdhodpqxlak3eAEkaga3yuihLtkgujnVmUAyEhFTSz0OFsjBomv6t4QFoDNmK8y_j8Y5ycymGfH8hEr7eFD7XMgLC3K0-NedPfu4niniTTYTwbJn5RQ1ggj1pCC84kDlqhXJnmfjr_8dqT2AXxurzHMgsc2ulDBOI-25diW3RU4qBeYJU-syZ2iV0E597rcVcahA0CMkk9zFyBX_OjEN94w9Qjiv3aIvkjHv8YmbdO_mS89UJPU_XJkkQwoH_MJr1DBuD8IrpgSSwQTUMNIaOEgRr4i0y0nJA-fP_VVDnj1Kc87VFZcVV6cRPwsnzS8gBXghhqCM6wRvOMUK9__wE8OnkOjN9udAebN4Y85HOLpba9cx6-xsVLDl4NN0W8fpxfloOEv3c3jR49q98FaDC0KCbQk2kgLFHpgyBlaqoe38hIeUYVouDTRB1sHWAWyB52gKR_BntYnW8evJIUdy7PE'
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
