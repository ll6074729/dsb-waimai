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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhYTBlYzkzZTVlNTczZGEwOGY4ZTMyMzdhYTIxN2ZkZGU2NDFiODVkMGYzNGQzYTA4Y2E0MGNiM2Q4NjhjNjBmYjI5NjA4YjIzMDZiM2FjIn0.eyJhdWQiOiIyIiwianRpIjoiZWFhMGVjOTNlNWU1NzNkYTA4ZjhlMzIzN2FhMjE3ZmRkZTY0MWI4NWQwZjM0ZDNhMDhjYTQwY2IzZDg2OGM2MGZiMjk2MDhiMjMwNmIzYWMiLCJpYXQiOjE1MzkwNTczMDgsIm5iZiI6MTUzOTA1NzMwOCwiZXhwIjoxNTM5MTQzNzA4LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.rxY0CY3pKxfi9pbEDBpCqeru1mpD62yEoFpsfgWn-P9UVsq737WYlTKOFQlX4tZ9-ebsMr1mXM1Z5PT9RTGQ4IHNZL_fK0Yw3Kv4IWimpJrAkv-9oyTcIjnHyuL4Bxm7E0d0EJq4lRXqYxD_2usYMsvxF8Gm6kZBZGhmQoCeQ-T_7_yPEiubTIxcSEtNapmuD_oGwwDkMuIpmqSQCoAv2EmbJ__GlLIWf5l6lk1l-o0_1oOf3dM6vPhQVz9QCdo1jsWbnCxiDWy1C-YVtY9cnhBsPKLfFzrOWyIfoIX4RzrRfay0P2n8Hr271yIV0UIF5y16W44xU--lWcx_sU48zgvFsPGLfddbkyCkBC4oR7UHXFyB0nM6YA3QOym-fsJEC7nG8j2ubvEHHkj05bcPeAFbJWsUFrkc8LV8S2rPMJvGXlxbzKNmYDuBr3g1_CtY9yrpTi_oQXhYVTuaFM8dtp-QeBT4gJi4Z0V_UZQ4ihSvW9mF6r9KUeW1jrc4r15ajf-xokzrIiwkusAPGAgpwtNZsD5iisDzBtTHIXj-4i9vjs9Py42LTBYIfCRxN6ej6qVswN5mHXfg88SxNUPcoKUzFEERqHzx3NaFBdXfBl5AmJeixUJhNMFc4_vzcZ29qMGdsgZnuxXwJStv50Y3OkTfy5kCDVBc2vlHB46zNzo'
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
