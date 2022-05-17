/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const path = require('path')
const { name } = require('./package.json')

function resolve (dir) {
  return path.join(__dirname, dir)
}
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 5003 npm run dev OR npm run dev --port = 5003
const port = 5003 // dev port
const publicPath = process.env.NODE_ENV === 'development' ? '/' : '/public/alliance'
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: '/',
  publicPath,
  outputDir: '../server/public',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  devServer: {
    disableHostCheck: true, // hosts
    historyApiFallback: true,
    port: port,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        ws: true,
        changeOrigin: true,
        pathRewrite: (path) => path.replace('/api', '')
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
