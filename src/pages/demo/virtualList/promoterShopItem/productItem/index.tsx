import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Image, View } from '@tarojs/components'

import formatCent from '../formatCent'

import './index.styl'

// 商品红包标签
const PRODUCT_RED_PACKET_LEVEL_PART = 2
const PRODUCT_RED_PACKET_LEVEL_FULL = 3

const productRedPacketLevelMap = {
  [PRODUCT_RED_PACKET_LEVEL_PART]: '红包特惠',
  [PRODUCT_RED_PACKET_LEVEL_FULL]: '全额抵扣'
}

export default class ProductItem extends PureComponent<any> {

  static propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  }

  handleClick = event => {
    const {
      onClick
    } = this.props

    if (onClick) {
      onClick(event)
    }
  }

  render() {
    const {
      item,
    } = this.props

    const product = item.product
    const productPricePrime = item.product_price_prime
    const productRedPacketLevel = item.product_red_packet_level

    let productRedPacketTag
    if (productRedPacketLevel) {
      productRedPacketTag = productRedPacketLevelMap[productRedPacketLevel]
    }

    return (
      <View
        className="product-card-item"
        key={product.id}
        onClick={this.handleClick}
      >
        <View className="product-cover-wrapper">
          <Image
            className="product-cover"
            src={product.cover.url}
            mode="aspectFit"
          />
          {
            productRedPacketTag ? (
              <View className="product-red-packet-tag">
                {productRedPacketTag}
              </View>
            ) : null
          }
        </View>

        <View className="product-title">
          {product.title}
        </View>

        <View className="product-sale-wrapper">
          <View className="product-sale">
            <View className="product-unit">
              ￥
            </View>
            <View className="product-sale-price">
              {formatCent(productPricePrime.sale_price)}
            </View>
          </View>
        </View>

      </View>
    )
  }
}


