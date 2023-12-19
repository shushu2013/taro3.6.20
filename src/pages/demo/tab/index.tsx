import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'

import Taro from '@tarojs/taro'
import { Button, Space, Tabs } from '@nutui/nutui-react-taro'

import './index.styl'

// 使用 definePageConfig 定义的页面配置对象不能使用变量
definePageConfig({
  navigationBarTitleText: 'Tab',
})

export default class Index extends PureComponent <any> {
  state: any = {
    tab4value: 0
  }

  handleTabChange = (value: any) => {
    this.setState({
      tab4value: value
    })
  }

  render() {
    const {
      tab4value
    } = this.state

    return (
      <View className="tab-page">
        <Tabs value={tab4value} onChange={this.handleTabChange}>
          <Tabs.TabPane title="低阶特卖">低阶特卖</Tabs.TabPane>
          <Tabs.TabPane title="上新日">上新日</Tabs.TabPane>
          <Tabs.TabPane title="百亿补贴">百亿补贴</Tabs.TabPane>
          <Tabs.TabPane title="今日聚超值">今日聚超值</Tabs.TabPane>
          <Tabs.TabPane title="真好真便宜1">真好真便宜1</Tabs.TabPane>
          <Tabs.TabPane title="真好真便宜2">真好真便宜2</Tabs.TabPane>
          <Tabs.TabPane title="真好真便宜3">真好真便宜3</Tabs.TabPane>
        </Tabs>
      </View>
    )
  }
}
