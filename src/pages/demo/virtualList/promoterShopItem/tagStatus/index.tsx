import React, {
  PureComponent,
} from 'react'

import {
  View,
} from '@tarojs/components'

import PropTypes from 'prop-types'

import './index.styl'

export default class TagStatus extends PureComponent<any, any> {

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
    text: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    type: 'default',
  }

  render() {
    let {
      type,
      text,
      onClick,
      className,
    } = this.props

    let classNameList = ['tag-status-component', `tag-type-${type}`]

    if (className) {
      classNameList.push(className)
    }

    return (
      <View
        className={classNameList.join(' ')}
        onClick={onClick}
      >
        {text}
      </View>
    )

  }

}
