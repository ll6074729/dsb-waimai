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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhZGMyOTI5ZWVhNWYzMzE2MDk1ZWZjYTVmYTI4YWJhNGJkMTFjMjUxYWQyZGUwYTFmZDdhMTQzNTA4M2ZkNDEwNGU0M2YwM2E3ZGI4NmExIn0.eyJhdWQiOiIyIiwianRpIjoiZWFkYzI5MjllZWE1ZjMzMTYwOTVlZmNhNWZhMjhhYmE0YmQxMWMyNTFhZDJkZTBhMWZkN2ExNDM1MDgzZmQ0MTA0ZTQzZjAzYTdkYjg2YTEiLCJpYXQiOjE1Mzk0MTA2NjcsIm5iZiI6MTUzOTQxMDY2NywiZXhwIjoxNTM5NDk3MDY3LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.owKzik0orhusj4uXRSU7DCLkS57kj8DxDgFv1VQGHut9agY-u_6_-hh9kVm_URK0ZF7hySGDX4le9S0iQMk_wYgyU8No0WPGfXz84ofpMzfcxUE6Gtz2Wo89eXqzSRRQrfDmFkiCiLcDZHWpV7nusn-ZcbnWTAkbsxH24Z248GhrO09WrABq5_Eq8HSJ2FNBGp2N7uCZBY1__Esih2HouddLXM5XF5uWY1Z9a4a2NVHAyqXTQFkjJsl60dwssXICtCyDnLheLovEHHBGQt_gVDo-DY4AtwLrBddWxebmrYUZbL7YWIvRombH8sxiAyMc9FZERoV7V_0Oyl6UWlYYshGBTmu_NHrGm4DVXC9VuTSB0h7ETjl_7_tM10-TQHHoc9z4M_AWZn7rts9TnUms6BAZpuoCYskY7AlTrYfmcdhoXWGJYfM25RDwx5cD35a46bhWH9FmYVimVTIhfkTOktGEvivruoamxiSnMThYLSvO7Qj_enfFf8MKAuMz3SQuWXbnbsn5kqjOfJQPlzlsFcWcOY4hT4b4isG-Fkvv8_nHRPOgFL9E2O6Y1GWlNwZmAXf_vLJXnss30p-M9f9G0XMbtdpHmW2DK2vgsDuRze_t2I6tK8UlgF8_DTnNzndtveqRFfH7vfN23Z59rqwiabxlAy571VzpeHTaTs0SbaM'
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
