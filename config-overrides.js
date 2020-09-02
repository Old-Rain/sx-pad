const path = require('path')
const fs = require('fs')

const {
  override,
  fixBabelImports,
  addWebpackExternals,
  addWebpackAlias,
  addLessLoader,
  overrideDevServer,
  watchAll,
} = require('customize-cra')
const rewirePostcss = require('react-app-rewire-postcss')
const postcssNormalize = require('postcss-normalize')

/* const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const myPlugin = [
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
    },
  }),
] */

module.exports = {
  webpack: override(
    /* fixBabelImports('import', {
        //配置按需加载
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      }), */
    /* addWebpackExternals({
        //不做打包处理配置，如直接以cdn引入的
        echarts: 'window.echarts',
        // highcharts:"window.highcharts"
      }), */
    /* addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1DA57A',
        },
      }), */
    addWebpackAlias({
      //路径别名
      '@': path.resolve(__dirname, 'src'),
    }),
    // fixBabelImports('import', {
    //   libraryName: 'antd-mobile',
    //   style: 'css',
    // }),
    (config) => {
      rewirePostcss(config, {
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
          require('postcss-px-to-viewport')({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 1366, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: [/ingore/], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
        ],
      })

      return config
    },
  ),
  devServer: overrideDevServer(
    // watchAll()
    (config) => {
      // console.log('devServer', config)

      return config
    },
  ),
}
