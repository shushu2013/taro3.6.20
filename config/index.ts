const config = {
  projectName: 'taro3.6.20',
  date: '2023-11-28',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack4',
    prebundle: { enable: false }
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain, webpack) {
      chain.module
        .rule('stylus')
          .oneOf('0')
            .use('2')
              .tap(options => {
                // 自定义插件，把大写 PX/Px/pX 转为小写 px
                const convertPxToLowercase = function (root, result) {
                  // 正则参考 https://github.com/cuth/postcss-pxtorem/blob/master/lib/pixel-unit-regex.js
                  const pxRegex = /("[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+))[Pp][xX]/g

                  root.walkDecls(function (decl, i) {
                    // This should be the fastest test and will remove most declarations
                    if (/px/i.test(decl.value) === false) return

                    const value = decl.value.replace(pxRegex, '$1px')
                    decl.value = value
                  })
                }

                const plugins = options.postcssOptions.plugins
                plugins.splice(1, 0, convertPxToLowercase)

                return options
              })
    },
    miniCssExtractPluginOption: {
      //忽略 css 文件引入顺序
      ignoreOrder: true
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    // esnextModules: ['nutui-react'],
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
