import Taro from "@tarojs/taro"

// 支付宝小程序
export const isAlipayApp = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
// 微信小程序
export const isWeApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
// web
export const isWeb = Taro.getEnv() === Taro.ENV_TYPE.WEB

const systemRes = Taro.getSystemInfoSync()
export const screenWidth = systemRes.screenWidth
export const screenHeight = systemRes.screenHeight
export const windowWidth = systemRes.windowWidth
// bugs: windowHeight 再微信内打开网页，计算的高度可能不对
// 会把底部浏览器工具栏高度计算在内，谨慎使用
export const windowHeight = systemRes.windowHeight

let initPxTransform = false
export function pxTransform(size) {
    if (!initPxTransform) {
      Taro.initPxTransform({
        designWidth: windowWidth,
        deviceRatio: {
          [windowWidth]: 750 / windowWidth
        },
      })

      initPxTransform = true
    }

    return Taro.pxTransform(size)
  }