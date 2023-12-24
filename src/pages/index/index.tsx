import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'

import Taro from '@tarojs/taro'
import { Button, Space } from '@nutui/nutui-react-taro'

import './index.styl'

// 使用 definePageConfig 定义的页面配置对象不能使用变量
definePageConfig({
  navigationBarTitleText: '首页',
})

export default class Index extends PureComponent <any> {

  render() {
    return (
      <View className="index-page">
        <View className="body">
          <Space
            direction="vertical"
            align="center"
          >
            {/* <Button
              type="primary"
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/demo/tab/index',
                })
              }}
            >
              Tab 页面
            </Button> */}

            <Button
              type="primary"
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/demo/virtualList/index',
                })
              }}
            >
              虚拟列表
            </Button>

            <Button
              type="primary"
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/demo/test/index',
                })
              }}
            >
              虚拟列表组件
            </Button>
            {/* <Button
              type="primary"
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/demo/scrollView/index',
                })
              }}
            >
              scrollView 重置
            </Button> */}
          </Space>
        </View>
      </View>
    )
  }
}
