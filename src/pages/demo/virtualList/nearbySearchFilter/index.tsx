import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash-es'
import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'

import SearchFilterMore from '../searchFilterMore'

import './index.styl'

const FILTER_TYPE_MULTIPLE = 1

export default class NearbySearchFilter extends PureComponent<any> {
  static propTypes = {
    onFilterChange: PropTypes.func,
  }

  state: any = {
    sortBy: 'common',
    sortByOrder: {
      order_count: 'desc',
      discount_index: 'asc',
      distance: 'asc'
    },
    filterMoreBy: {},

    filterArr: [
      {
        key: 'common',
        name: '综合排序',
      },
      {
        key: 'order_count',
        name: '销量优先',
      },
      {
        key: 'discount_index',
        name: '低价优先',
      },
      {
        key: 'distance',
        name: '距离优先',
      }
    ],
    // filterMoreArr: [
    //   {
    //     key: 'service',
    //     name: '服务',
    //     children: [
    //       {
    //         key: 'discount',
    //         name: '优惠',
    //       }
    //     ]
    //   }
    // ],

    showFilterMore: false,
  }

  constructor(props) {
    super(props)
  }

  handleClickMultipleItem = item => {
    let {
      sortBy,
      sortByOrder,
    } = this.state

    const key = item.key
    const sort = sortByOrder[key]
    sortByOrder = cloneDeep(sortByOrder || {})

    if (sortBy === key || !sort) {
      if (sort === 'asc') {
        sortByOrder[key] = 'desc'
      }
      else {
        sortByOrder[key] = 'asc'
      }
    }

    this.setState(
      {
        sortBy: key,
        sortByOrder,
      },
      this.handleFilterChange
    )
  }

  handleClickSingleItem = item => {
    const sortByOrder = cloneDeep(this.state.sortByOrder || {})
    const key = item.key

    this.setState(
      {
        sortBy: key,
        sortByOrder,
      },
      this.handleFilterChange
    )
  }

  handleShowFilterMore = () => {
    const {
      showFilterMore
    } = this.state

    this.setState({
      showFilterMore: !showFilterMore,
    })
  }

  handleReset = () => {
    this.setState(
      {
        filterMoreBy: {},
        showFilterMore: false,
      },
      this.handleFilterChange
    )
  }

  handleConfirm = filters => {
    this.setState(
      {
        filterMoreBy: filters,
        showFilterMore: false,
      },
      this.handleFilterChange
    )
  }

  handleFilterChange = () => {
    const {
      sortBy,
      sortByOrder,
      filterMoreBy,
    } = this.state

    const {
      onFilterChange
    } = this.props

    if (onFilterChange) {
      const data = cloneDeep(
        {
          sortBy,
          sortOrder: sortByOrder[sortBy],
          filterMoreBy,
        }
      )

      onFilterChange(data)
    }
  }

  render() {

    const {
      sortBy,
      sortByOrder,
      filterMoreBy,

      filterArr,
      filterMoreArr,
      showFilterMore,
    } = this.state

    // const filterMoreActive = showFilterMore || !isEmpty(filterMoreBy)
    // const filterMoreClassName = `filter-more ${filterMoreActive ? 'active' : ''}`
    // const filterMoreIcon = filterMoreActive ?
    //   'https://img.finstao.com/106f864980cf85fdee5fca6961155ecf.png' :
    //   'https://img.finstao.com/7e35cf17dec890e14836cfde76135ad6.png'

    return (
      <View className="nearby-search-filter">
        <View className="search-filter-container">
          <View className="filter-items">
            {
              filterArr.map(item => {
                const {
                  key,
                  type,
                  name,
                } = item

                let itemClassName = `filter-item ${key === sortBy ? 'active' : ''}`
                let modeAscClassName = 'mode-asc'
                let modeDescClassName = 'mode-desc'

                const sort = sortByOrder[key]
                if (type === FILTER_TYPE_MULTIPLE) {

                  itemClassName += ' multiple'

                  if (key === sortBy) {
                    modeAscClassName += ` ${sort !== 'desc' ? 'active' : ''}`
                    modeDescClassName += ` ${sort === 'desc' ? 'active' : ''}`
                  }
                }

                if (type === FILTER_TYPE_MULTIPLE) {
                  return (
                    <View
                      key={key}
                      className={itemClassName}
                      onClick={() => {
                        this.handleClickMultipleItem(item)
                      }}
                    >
                      <View className="filter-item-name">
                        {name}
                      </View>
                      <View className="filter-item-mode">
                        {
                          sort !== 'desc' ? (
                            <View className={modeAscClassName}></View>
                          ) : (
                            <View className={modeDescClassName}></View>
                          )
                        }
                      </View>
                    </View>
                  )
                }

                return (
                  <View
                    key={key}
                    className={itemClassName}
                    onClick={() => {
                      this.handleClickSingleItem(item)
                    }}
                  >
                    {name}
                  </View>
                )
              })
            }

            {/* <View
              className={filterMoreClassName}
              onClick={this.handleShowFilterMore}
            >
              <View className="filter-more-name">
                筛选
              </View>
              <Image
                className="filter-more-icon"
                src={filterMoreIcon}
              />
            </View> */}
          </View>
        </View>

        {
          showFilterMore ? (
            <View
              className="search-filter-more-container"
            >
              <View
                className="search-filter-more-body"
              >
                <SearchFilterMore
                  filterMoreArr={filterMoreArr}
                  initFilters={filterMoreBy}
                  onReset={this.handleReset}
                  onConfirm={this.handleConfirm}
                />
              </View>

              <View
                className="search-filter-more-mask"
                onClick={this.handleShowFilterMore}
              />
            </View>
          ) : null
        }
      </View>
    )
  }
}

