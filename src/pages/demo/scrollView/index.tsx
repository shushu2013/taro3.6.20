import React, { PureComponent } from 'react'
import { ScrollView, View } from '@tarojs/components'

import './index.styl'

// 使用 definePageConfig 定义的页面配置对象不能使用变量
definePageConfig({
  navigationBarTitleText: '虚拟列表',
})

export default class Index extends PureComponent <any> {
  state: any = {
    tabs: [
      '低阶特卖',
      '上新日',
      '百亿补贴',
      '今日聚超值',
      '真好真便宜'
    ],
    tabContent: '',
    scrollLeft: 0,
  }

  render() {
    const {
      tabs,
      scrollLeft,
      tabContent,
    } = this.state

    return (
      <View className="scroll-view-page">
        <ScrollView
          className="scroll-view"
          scrollX
          // scrollLeft={scrollLeft}
        >
          {
            tabs.map((item, index) => {
              const isActive = tabContent === item

              return (
                <View
                  className={`tab-item ${isActive ? 'active' : ''}`}
                  key={index}
                  onClick={() => {
                    this.setState({
                      tabContent: item
                    })
                  }}
                >
                  {item}
                </View>
              )
            })
          }
        </ScrollView>

        <View className="body">
          {tabContent}
        </View>
      </View>
    )
  }
}
