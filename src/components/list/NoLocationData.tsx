import React, {
  PureComponent,
} from 'react'

import {
  View,
  Text,
} from '@tarojs/components'
import PropTypes from 'prop-types'

import NoData from './NoData'

import './NoLocationData.styl'

export default class NoLocationData extends PureComponent<any, any> {

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    onOpenLocation: PropTypes.func,
  }

  static defaultProps = {
    text: '暂无数据'
  }

  handleOpenLocation = () => {
    const {
      onOpenLocation
    } = this.props

    if (onOpenLocation) {
      onOpenLocation()
    }
  }

  render() {

    let {
      className,
      text,
    } = this.props

    let baseClass = 'no-location-data-component'
    if (className) {
      baseClass += ' ' + className
    }

    const locationFailed = true

    return (
      <View className={baseClass}>
        <NoData
          text={text}
        />
        {
          locationFailed ? (
            <View className="location-tips">
              <Text>定位服务未开启</Text>
              <View
                className="location-btn"
                onClick={this.handleOpenLocation}
              >
                去开启
              </View>
            </View>
          ) : null
        }
      </View>
    )
  }

}
