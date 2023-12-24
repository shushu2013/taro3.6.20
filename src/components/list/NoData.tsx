import React, {
  PureComponent,
} from 'react'

import {
  View,
} from '@tarojs/components'

import PropTypes from 'prop-types'

import './NoData.styl'

export default class NoData extends PureComponent<any, any> {

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
  }

  static defaultProps = {
    text: '暂无数据'
  }

  render() {

    let {
      className,
      text,
    } = this.props

    let baseClass = 'no-data-component'
    if (className) {
      baseClass += ' ' + className
    }

    return (
      <View className={baseClass}>
        <View className="no-data-wrapper">
          <View
            className="no-data-text"
          >
            {text}
          </View>
        </View>
      </View>
    )
  }

}
