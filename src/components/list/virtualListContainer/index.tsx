import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import React, { PureComponent, createRef } from 'react'

import VirtualList from '@tarojs/components/virtual-list'

import {
  PullToRefresh
} from '@nutui/nutui-react-taro'
import { Refresh2 } from '@nutui/icons-react-taro'

import NoData from '../NoData'
import NoMore from '../NoMore'
import Fetching from '../Fetching'
import LoadingMore from '../LoadingMore'

import './index.styl'

export default class VirtualListContainer extends PureComponent<any, any> {

  static propTypes = {
    className: PropTypes.string,

    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    itemSize: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    renderTop: PropTypes.func,

    fetching: PropTypes.bool,
    fetchingTitle: PropTypes.string,
    refreshing: PropTypes.bool,
    refreshingTitle: PropTypes.string,
    loading: PropTypes.bool,
    loadingTitle: PropTypes.any,

    noDataTitle: PropTypes.any,
    noMoreTitle: PropTypes.any,

    // 加载头部
    fetchNew: PropTypes.func,
    hasNew: PropTypes.bool,

    // 加载尾部
    fetchMore: PropTypes.func,
    hasMore: PropTypes.bool,

    onScroll: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    loadingTitle: '加载更多...',
    fetchingTitle: '正在加载，请稍候...',
    refreshingTitle: '获取最新数据...',
    noDataTitle: '暂无数据',
    noMoreTitle: (
      <NoMore />
    ),
  }

  private virtualListRef = createRef<VirtualList>()

  constructor(props) {
    super(props)
  }

  onRefresh = () => {
    let {
      fetching,
      refreshing,
      loading,
      fetchNew,
    } = this.props

    if (fetching || refreshing || loading) {
      return new Promise(resolve => {
        resolve({
          code: -1,
          msg: '正在加载中'
        })
      })
    }

    if (fetchNew) {
      return fetchNew()
    }
  }

  onEndReached = () => {
    let {
      data,
      fetching,
      refreshing,
      loading,
      hasMore,
      fetchMore,
    } = this.props
console.log('onEndReached');

    if (fetching || refreshing || loading) {
      return
    }

    if (hasMore && fetchMore) {
      const dataLen = data.length

      fetchMore()
        .finally(() => {
          console.log('dataLen = ', dataLen);

          setTimeout(() => {
            this.virtualListRef.current?.scrollToItem(dataLen, "auto")
          }, 10)
        })
    }
  }

  onScroll = e => {
    const {
      onScroll
    } = this.props

    if (onScroll) {
      onScroll(e)
    }
  }

  renderLoading() {
    const {
      loading,
      loadingTitle,
    } = this.props

    // if (!loading) {
    //   return null
    // }

    if (typeof loadingTitle === 'string') {
      return (
        <LoadingMore
          text={loadingTitle}
        />
      )
    }

    return loadingTitle
  }

  renderFetching() {
    let { fetchingTitle } = this.props

    return (
      <Fetching
        text={fetchingTitle}
      />
    )
  }

  renderNoData = () => {

    let {
      data,
      loading,
      fetching,
      refreshing,
      noDataTitle,
    } = this.props

    if (fetching || refreshing || loading) {
      return null
    }

    if (typeof noDataTitle === 'function') {
      noDataTitle = noDataTitle(data)
    }

    if (typeof noDataTitle !== 'string') {
      return noDataTitle
    }
    else if (noDataTitle) {
      return (
        <NoData
          text={noDataTitle}
        />
      )
    }
    else {
      return null
    }

  }

  renderNoMore = () => {

    let {
      data,
      noMoreTitle,
    } = this.props

    if (typeof noMoreTitle === 'function') {
      noMoreTitle = noMoreTitle(data)
    }

    if (typeof noMoreTitle !== 'string') {
      return noMoreTitle
    }
    else if (noMoreTitle) {
      return (
        <NoMore
          text={noMoreTitle}
        />
      )
    }
    else {
      return null
    }

  }

  renderFooter = () => {
    const {
      data,
      fetching,
      hasMore,
    } = this.props

    if (fetching) {
      return this.renderFetching()
    }

    if (data.length) {
      if (hasMore) {
        return this.renderLoading()
      }
      else {
        return this.renderNoMore()
      }
    }

    return this.renderNoData()
  }

  // scrollToTop(top = 0) {
  //   const current = this.scrollViewRef.current
  //   if (current) {
  //     current.scrollTop = top
  //   }
  // }

  render() {
    const {
      data,
      height,
      itemSize,
      className,
      renderTop,
      renderItem,
    } = this.props

    const dataLen = data.length

    const renderBottom = this.renderFooter()

    console.log(this.props.loading, data, renderBottom);

    return (
      <PullToRefresh
        className='virtual-list-pull-refresh'
        style={{
          height: `${height}px`,
        }}
        threshold={40}
        headHeight={50}
        onRefresh={this.onRefresh}
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
        {
          dataLen === 0 ? (
            <View className="list-emtpy">
              {renderTop && renderTop()}

              <View className="no-data-body">
                {renderBottom}
              </View>
            </View>
          ) : (
            <VirtualList
              className="virtual-list"
              // key={dataLen}
              height={height}
              width="100%"
              ref={this.virtualListRef}

              item={renderItem}
              itemData={data}
              itemCount={dataLen}
              itemSize={itemSize}

              // 顶部区域
              renderTop={renderTop && renderTop()}
              // 底部区域
              renderBottom={renderBottom}

              // 解开高度列表单项大小限制
              // unlimitedSize

              // 可视区域之外渲染的列表单项数量
              // overscanCount={10}

              // 在可视区域之外占位的列表单项数量
              // placeholderCount={10}

              // useIsScrolling
              lowerThreshold={100}
              // onScroll={this.onScroll}
              onScrollToLower={this.onEndReached}
              // onScrollToUpper={this.onRefresh}

              // 所有 ScrollView 组件的参数都可以传入 VirtualList 组件
              enhanced
              // @ts-ignore
              showScrollbar={false}
              // scrollWithAnimation
              // scrollAnchoring={true}
            />
          )
        }
      </PullToRefresh>
    )
  }
}

export function createListProps() {
  return {
    data: [],
    page: 0,
    hasNew: true,
    hasMore: true,
    fetching: false,
    loading: false,
    refreshing: false,
  }
}
