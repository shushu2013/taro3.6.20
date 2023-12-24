import PropTypes from 'prop-types'
import NP from 'number-precision'
import React, { PureComponent } from 'react'
import { Rate } from '@nutui/nutui-react-taro'
import { Image, View } from '@tarojs/components'

import { isEmpty } from './dataType'

import TagStatus from './tagStatus'

import HotTag from './hotTag'
import ProductItems from './productItems'

import './index.styl'

const SHOP_BUSINESS_STATUS_CLOSED = 2

// 统一获取店铺名和logo
function getShopName(mallShop, shop?: any) {
  return mallShop?.name || shop?.name || '今小店'
}

export default class PromoterShopItem extends PureComponent<any> {

  static propTypes = {
    index: PropTypes.number,
    shopItem: PropTypes.object.isRequired,
  }

  formatDistance(distance) {
    if (isEmpty(distance)) {
      return ''
    }

    if (distance < 500) {
      return `${distance}m`
    }

    return `${NP.divide(distance, 1000).toFixed(1)}km`
  }

  formatDistrictName(area) {
    let name = ''

    if (area) {
      name = area.district?.name
        || area.city?.name
        || area.province?.name
        || area.country?.name
    }

    return name
  }

  render() {
    const {
      index,
      shopItem,
    } = this.props

    const mallShop = shopItem.shop
    const area = shopItem.area
    const productList = shopItem.product_list
    const shopImage1 = shopItem.shop_logo || shopItem.shop_image1
    const promoterShop = shopItem.promoter_shop
    const returnedCustomerCount = shopItem.returned_customer_count

    const shopBusinessStatus = mallShop.business_status
    const hasProduct = !isEmpty(productList)
    const showCustomerCount = hasProduct && returnedCustomerCount > 0
    const shopRate = 5
    const shopDistance = this.formatDistance(shopItem.distance)
    const shopHot = index < 5
    const shopName = getShopName(mallShop, promoterShop)

    let shopTagText = this.formatDistrictName(area)

    return (
      <View
        className="promoter-shop-item"
      >
        <View
          className="promoter-shop-item-wrapper"
        >
          <View className="promoter-shop-item-img-wrapper">
            <Image
              className={`promoter-shop-item-img ${hasProduct && !showCustomerCount ? 'has-product' : ''}`}
              src={shopImage1?.url}
              mode="aspectFill"
            />

            {
              showCustomerCount ? (
                <View className="customer-count-view">
                  <HotTag
                    className="customer-hot"
                    title="人气推荐"
                  />
                  <View className="customer-desc">
                    近30日{returnedCustomerCount}个回头客
                  </View>
                </View>
              ) : null
            }
          </View>

          <View className="promoter-shop-item-info">
            <View className="promoter-shop-item-title-wrapper">
              {
                shopBusinessStatus === SHOP_BUSINESS_STATUS_CLOSED ? (
                  <TagStatus
                    text="已打烊"
                  />
                ) : null
              }
              <View className="promoter-shop-item-title">
                {shopName}
              </View>
            </View>

            <View
              className="promoter-shop-item-rate"
            >
              <View className="promoter-shop-rate-wrapper">
                <View className="promoter-shop-rate-score">
                  <View className="promoter-shop-rate-value">{shopRate}</View>
                  <View className="promoter-shop-rate-unit">分</View>
                </View>

                <View className="promoter-shop-rate-icon">
                  <Rate
                    readOnly
                    count={5}
                    defaultValue={Math.floor(shopRate)}
                  />
                </View>
              </View>

              <View className="promoter-shop-distance">
                {shopDistance}
              </View>
            </View>

            <View className="promoter-shop-item-line shop-item-line-between">
              <View
                className="promoter-shop-tag"
              >
                {shopTagText}
              </View>
            </View>

            {
              !hasProduct && shopHot ? (
                <View
                  className="promoter-shop-item-line promoter-shop-tips"
                >
                  {
                    shopHot ? (
                      <HotTag title="附近热卖" />
                    ) : null
                  }
                </View>
              ) : null
            }

            {
              hasProduct ? (
                <View className="product-items-wrapper">
                  <View className="product-items-list">
                    <ProductItems
                      productList={productList}
                      promoterShop={promoterShop}
                      mallShop={mallShop}
                    />
                  </View>
                </View>
              ) : null
            }
          </View>
        </View>
      </View>
    )
  }
}


