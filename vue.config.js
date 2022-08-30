const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')

module.exports = {
  publicPath: './', // 这样打包发布后 可以直接点开dist里面的index.html运行项目
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 'nav-bar-background-color': 'red'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // 从盘符开始的就是绝对路径
            hack: `true; @import "${themePath}";`
          }
        }
      }
    }
  }
}
