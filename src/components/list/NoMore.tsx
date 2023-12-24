
import React, {
  PureComponent,
} from 'react'

import {
  View,
  Image,
} from '@tarojs/components'

import icon from './img/list-no-more@2x.png'

import './NoMore.styl'

export default class NoMore extends PureComponent<any, any> {


  render() {
    let {
      text,
    } = this.props

    return (
      <View className='no-more-component'>
        {
          text ? (
            <View className="no-more-title">
              {text}
            </View>
          ) : (
            <Image
              className='no-more-image'
              src={icon}
            />
          )
        }
      </View>
    )

  }
}
