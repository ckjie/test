module.exports = {
  /* 默认为'/'，即项目配置在域名的根路径下，可修改为空字符串('')或相对路径('./')，这样可以配置在任何路径下，但路由使用history模式或构建多页面应用时应避免使用相对路径 */
  publicPath: '/',
  outputDir: 'dist',    // 输出文件目录
  assetsDir: 'assets',    // 设置生成的静态文件的目录(js, img, css, fonts)
  productionSourceMap: false,     // 是否在构建生产包时生成sourceMap文件，设置为false以加速生产环境构建
  filenameHashing: false,   // 默认情况下，生成的静态资源在它们的文件名中包含了hash以便更好的控制缓存，可设置为false关闭文件名哈希
  lintOnSave: true,     // 代码保存时进行eslint检测
  devServer: {    // webpack-dev-server
    open: false,   // 自动打开浏览器
    host: '0.0.0.0',    // 设置为0.0.0.0则所有的地址均能访问
    port: 8000,
    proxy: {    // 使用代理
      '/': {
        target: 'http://127.0.0.1:5000/',    // 目标代理服务器地址
        changeOrigin: true    // 允许跨域
      }
    }
  }
}