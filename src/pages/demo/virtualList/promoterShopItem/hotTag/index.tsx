import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'

import './index.styl'

export default class HotTag extends PureComponent<any> {

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  render() {
    const {
      title,
      className,
    } = this.props

    const classNames = ['hot-tag-component']
    const hotIcon = 'https://img.finstao.com/fc4b4df20794f0ac28b85dae66b5d619.png'

    if (className) {
      classNames.push(className)
    }

    return (
      <View className={classNames.join(' ')}>
        <Image
          src={hotIcon}
          className="hot-icon"
        />
        <View className="hot-text">
          {title}
        </View>
      </View>
    )
  }
}


