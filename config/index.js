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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI5NmI4ZGEwYjYzZDhiY2ZhMDM0MDk4ZDE1ODlmZmM5ZDEwZTlkODQ3NzIxNDJlN2MxODhmZWRjMzJlZDZkZTM2NWYzNjA4YzZhMWZmZDRjIn0.eyJhdWQiOiIyIiwianRpIjoiMjk2YjhkYTBiNjNkOGJjZmEwMzQwOThkMTU4OWZmYzlkMTBlOWQ4NDc3MjE0MmU3YzE4OGZlZGMzMmVkNmRlMzY1ZjM2MDhjNmExZmZkNGMiLCJpYXQiOjE1MzkxNDM5NjUsIm5iZiI6MTUzOTE0Mzk2NSwiZXhwIjoxNTM5MjMwMzY1LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.RCDr3cb-MDE0ztZDgloEGmltLh3bfOW5G1VP_EcafC56NHV0YUA5Ca4RJ-snHZiurrp9epushYmZsFTeZlXw0_MJDFA5-sebD8b5o7fdAlNXWNziI_VmBfUQ9Qy4foIecxi8t39E5H4n5miT_Ebd88NJ7kcKuky12V_F3lfSWSawjSk6_CcpvHm60SmWtkEFkFaffS-NBg2xvIDiYawAt8Ltj3trlsnNF-47SsRH7SS14aAKhh0I8eonfhmjFgUuOMdRmYMen9MmB5SybjkxF5JKKRVlQtCpnKpRKpbM7K2gARp7NMA9LsQykaIW2EnzrMaVffhwQEzdLqTWGGrEaU8Zh46BgSzVPfqkqMteDQYWgPBZFGmVTwe3DjZMRecyV3qS3CJ9BBdcs78opaLzPYPMDkDIECWo3eYS5i7sM9HWU9EB_1B668jgcxiIDbR0sYn7coaUMVhohqFOde1WFHrqeh2_DhBL0ojHPeo8YGFo7_gTV8ZWjh_mWzyI0W8DbIYtDb5FeustOhlDp-O4KdlyV4-3mAFp4qWsS-YxP2Arc4Kwz-dEfLnXbMyPtfC0YPYQ-aWn-3Ii8FGLEemegsqRbqzCoa6Mr2ID-jHqeAXppoTpcK_IgXv1RNSChWgGk4FwF8wu1GyB90sUaZUMM2WXgSvhBAGLTsoPjboYujs'
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
