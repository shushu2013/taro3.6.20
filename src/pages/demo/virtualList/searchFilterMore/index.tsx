import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'

import './index.styl'

export default class SearchFilterMore extends PureComponent<any> {

  static propTypes = {
    filterMoreArr: PropTypes.array.isRequired,
    initFilters: PropTypes.object,
    onReset: PropTypes.func,
    onConfirm: PropTypes.func,
  }

  state: any = {
    filters: {},
  }

  constructor(props) {
    super(props)

    if (this.props.initFilters) {
      this.state.filters = this.props.initFilters
    }
  }

  handleClickFilterMoreItem = item => {
    const {
      filters
    } = this.state

    const key = item.key

    const value = !filters[key]

    this.setState({
      filters: {
        ...filters,
        [key]: value,
      }
    })
  }

  handleReset = () => {
    const {
      onReset
    } = this.props

    this.setState({
      filters: {}
    })

    if (onReset) {
      onReset()
    }
  }

  handleConfirm = () => {
    const {
      onConfirm
    } = this.props

    const {
      filters
    } = this.state

    const finallyFilters = {}
    Object.keys(filters).forEach(function (key) {
      if (filters[key]) {
        finallyFilters[key] = filters[key]
      }
    })

    if (onConfirm) {
      onConfirm(finallyFilters)
    }
  }

  render() {

    const {
      filterMoreArr,
    } = this.props

    const {
      filters
    } = this.state

    return (
      <View 
        className="search-filter-more"
      >
        {
          filterMoreArr.map(item => {
            const {
              key,
              name,
              children
            } = item

            return (
              <View
                key={key}
                className="filter-more-item"
              >
                <View className="item-name">
                  {name}
                </View>
                {
                  children.map(child => {
                    let itemChildClassName = 'item-child'

                    if (filters[child.key]) {
                      itemChildClassName += ' active'
                    }

                    return (
                      <View
                        key={child.key}
                        className={itemChildClassName}
                        onClick={() => {
                          this.handleClickFilterMoreItem(child)
                        }}
                      >
                        {child.name}
                      </View>
                    )
                  })
                }
              </View>
            )
          })
        }

        <View className="filter-btns">
          <View
            className="reset-btn"
            onClick={this.handleReset}
          >
            重置
          </View>
          <View
            className="confirm-btn"
            onClick={this.handleConfirm}
          >
            确定
          </View>
        </View>
      </View>
    )
  }
}

