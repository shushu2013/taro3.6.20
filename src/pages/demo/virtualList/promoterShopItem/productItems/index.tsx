import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'

import ProductItem from '../productItem'

import './index.styl'

export default class ProductItems extends PureComponent<any> {

  static propTypes = {
    mallShop: PropTypes.object,
    promoterShop: PropTypes.object,
    productList: PropTypes.array.isRequired,
  }

  render() {
    const {
      productList,
    } = this.props

    return (
      <View className="product-items">
        {
          productList.map((item, index) => {
            return (
              <View
                className="product-item-wrapper"
                key={index}
              >
                <ProductItem
                  item={item}
                />
              </View>
            )
          })
        }

        {
          productList.length >= 3 ? (
            <View className="product-item-more">
              <View className="product-more-text">
                查看更多
              </View>
            </View>
          ) : null
        }

        <View className="placeholder"></View>
      </View>
    )
  }
}


