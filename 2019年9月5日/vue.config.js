const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  outputDir: 'dist',
  baseUrl: './',
  // publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : './',
  publicPath:  './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  devServer: {
    port: 9876,     // 端口
  },
  lintOnSave: false   // 取消 eslint 验证
};
