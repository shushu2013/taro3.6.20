import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import VirtualList from "@tarojs/components/virtual-list"

import {
  PullToRefresh
} from '@nutui/nutui-react-taro'
import { Refresh2 } from '@nutui/icons-react-taro'

import { isAlipayApp, isWeApp, windowHeight, windowWidth } from './util'

import * as mock from './mock'

import { isEmpty } from './promoterShopItem/dataType'

import PromoterShopItem from './promoterShopItem'
import NearbySearchFilter from './nearbySearchFilter'

import './index.styl'

// 使用 definePageConfig 定义的页面配置对象不能使用变量
definePageConfig({
  navigationBarTitleText: '虚拟列表',
})

export default class List extends PureComponent <any> {
  state = {
    data: [],
    loading: false,
  }

  componentDidMount(): void {
    this.fetchNew()
  }

  renderItem = ({ id, index, data }) => {
    return (
      <PromoterShopItem
        id={id}
        index={index}
        shopItem={data[index]}
      />
    )
  }

  caculateItemSize = (index, data) => {
    console.log(data, index);

    if (data == null) {
      return this.toPX(128)
    }

    const item = data[index]

    if (isEmpty(item.product_list)) {
      return this.toPX(128)
    }

    return this.toPX(236)
  }

  toPX(px) {
    if (isWeApp || isAlipayApp) {

      const ratio = 750 / windowWidth
      px = Math.round((px * 2 / ratio))
    }

    return px
  }

  fetchNew = () => {
    console.log('fetNew');

    return mock.searchPromoterMallShop()
      .then((response: any) => {

        if (response.code === 0) {
          const { data } = response

          console.log('fetNew success 00');

          this.setState(
            {
              data: data.list,
            },
            () => {
              console.log('fetNew success 11');
            }
          )
        }
      })
  }

  fetchMore = () => {
    console.log('fetMore');

    this.setState({
      loading: true,
    })

    mock.searchPromoterMallShop()
      .then((response: any) => {

        if (response.code === 0) {
          const { data } = response

          this.setState({
            data: this.state.data.concat(data.list),
            loading: false,
          })
        }
      })
  }

  renderTop = () => {
    return (
      <View
        key="top"
      >
        <View className="category-filter-fake" />

        <View className="shop-search-filter-container">
          <View className="shop-search-filter-title">
            附近商家
          </View>

          <NearbySearchFilter
          />
        </View>
      </View>
    )
  }

  renderFooter = () => {
    const {
      loading
    } = this.state

    if (loading) {
      return (
        <View className="virtual-list-footer-text">
          加载数据
        </View>
      )
    }

    return null
  }

  onScroll = ({ scrollDirection, scrollOffset }) => {
    const { data } = this.state;
    const dataLen = data.length;

    if (
      // 只有往前滚动我们才触发
      scrollDirection === 'forward' &&
      // 5 = (列表高度 / 单项列表高度)
      // 100 = 滚动提前加载量，可根据样式情况调整
      scrollOffset > (dataLen - 5) * 200
    ) {
      // this.fetchMore()
    }
  }

  render() {
    const { data } = this.state;
    const dataLen = data.length;

    if (dataLen === 0) {
      return null
    }

    console.log('data render = ', data);

    return (
      <PullToRefresh
        style={{
          height: `${windowHeight}px`,
        }}
        className='virtual-list-pull-refresh'
        threshold={40}
        headHeight={50}
        onRefresh={this.fetchNew}
        pullingText={
          <View className="refresh-tips">
            <Refresh2
              className="nut-icon-am-rotate nut-icon-am-infinite"
              size={14}
            />
            <View className="tips">
              下拉刷新
            </View>
          </View>
        }
        canReleaseText={
          <View className="refresh-tips">
            <Refresh2
              className="nut-icon-am-rotate  nut-icon-am-infinite"
              size={14}
            />
            <View className="tips">
              松开刷新
            </View>
          </View>
        }
      >
        <VirtualList
          className="virtual-list"
          height={windowHeight} /* 列表的高度 */
          width="100%" /* 列表的宽度 */

          item={this.renderItem} /* 列表单项组件，这里只能传入一个组件 */
          itemData={data} /* 渲染列表的数据 */
          itemCount={dataLen} /* 渲染列表的长度 */
          itemSize={this.caculateItemSize} /* 列表单项的高度  */

          // 解开高度列表单项大小限制
          // unlimitedSize

          // 顶部区域
          renderTop={this.renderTop()}
          // 底部区域
          renderBottom={this.renderFooter()}

          lowerThreshold={100}
          // onScrollToUpper={this.fetchNew}
          // onScrollToLower={this.fetchMore}
          // onScroll={this.onScroll}

          enhanced
          // @ts-ignore
          showScrollbar={false}
        />
      </PullToRefresh>
    )
  }
}
