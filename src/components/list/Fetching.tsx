
import React, {
  PureComponent,
} from 'react'

import {
  View,
} from '@tarojs/components'

import { Loading1 } from '@nutui/icons-react-taro'

import PropTypes from 'prop-types'

import './Fetching.styl'

export default class Fetching extends PureComponent<any, any>  {

  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: '正在加载，请稍候...'
  }

  render() {

    let {
      text,
    } = this.props

    return (
      <View className='fetching-component'>
        <Loading1 size={20} />

        <View className='fetching-text'>
          {text}
        </View>
      </View>
    )

  }
}
