import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'

import { isAlipayApp, isWeApp, windowHeight, windowWidth } from '../virtualList/util'

import * as mock from '../virtualList/mock'

import { isEmpty } from '../virtualList/promoterShopItem/dataType'

import PromoterShopItem from '../virtualList/promoterShopItem'
import NearbySearchFilter from '../virtualList/nearbySearchFilter'

import VirtualListContainer from '../../../components/list/virtualListContainer'

import './index.styl'
import { Loading } from '@nutui/nutui-react-taro'

// 使用 definePageConfig 定义的页面配置对象不能使用变量
definePageConfig({
  navigationBarTitleText: '虚拟列表',
})

export default class List extends PureComponent <any> {
  state = {
    isPageLoading: true,

    // 列表相关数据
    data: [],
    page: 0,
    fetching: true,
    refreshing: false,
    loading: false,
    hasMore: true,
    hasNew: true,
  }

  componentDidMount(): void {
    this.fetchNew()
      .finally(() => {
        this.setState({
          isPageLoading: false,
        })
      })
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

  caculateItemSize = (index, dataList) => {

    const {
      data
    } = this.state

    console.log(data, index, dataList);

    if (data == null) {
      return this.toPX(128)
    }

    const item: any = data[index]

    if (isEmpty(item?.product_list)) {
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

    const {
      data,
    } = this.state

    this.setState({
      [data.length ? 'refreshing' : 'fetching']: true,
    })

    return mock.searchPromoterMallShop()
      .then((response: any) => {

        if (response.code === 0) {
          const { data } = response

          console.log('fetNew success 00');

          this.setState(
            {
              data: data.list,
              page: data.pager.page,
              hasMore: data.pager.page < data.pager.count,
            },
            () => {
              console.log('fetNew success 11');
            }
          )
        }
      })
      .finally(() => {
        this.setState({
          [data.length ? 'refreshing' : 'fetching']: false,
        })
      })
  }

  fetchMore = () => {
    console.log('fetMore');

    this.setState({
      loading: true,
    })

    return mock.searchPromoterMallShop()
      .then((response: any) => {

        if (response.code === 0) {
          const { data } = response

          this.setState({
            data: this.state.data.concat(data.list),
            page: data.pager.page,
            hasMore: data.pager.page < data.pager.count,
            loading: false,
          })
        }
      })
      .finally(() => {
        // this.setState({
        //   loading: false,
        // })
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

  render() {
    const {
      isPageLoading,
      ...listState
    } = this.state

    if (isPageLoading) {
      return <Loading />
    }

    return (
      <VirtualListContainer
        {...listState}
        height={windowHeight}
        renderItem={this.renderItem}
        itemSize={this.caculateItemSize}
        renderTop={this.renderTop}
        fetchNew={this.fetchNew}
        fetchMore={this.fetchMore}
      />
    )
  }
}
