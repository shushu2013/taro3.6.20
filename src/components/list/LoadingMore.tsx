
import React, {
  PureComponent,
} from 'react'

import {
  View,
} from '@tarojs/components'

import PropTypes from 'prop-types'

import './LoadingMore.styl'

export default class LoadingMore extends PureComponent<any, any> {

  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: '加载更多...'
  }

  render() {

    let {
      text,
    } = this.props

    return (
      <View className='loading-more-component'>
        <View className='loading-more-text'>
          {text}
        </View>
      </View>
    )

  }
}
