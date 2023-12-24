import NP from 'number-precision'

import {
  uniq,
  isEqual,
  isNaN,
  toNumber,
} from 'lodash-es'

// 空值: {}, [], '', '   ', null, undefined, NaN
export function isEmpty(value) {
  if (value == null
      || isNaN(value)
  ) {
    return true
  }

  let isEmpty = false
  const protoType = Object.prototype.toString.call(value)
  switch (protoType) {

    case '[object Object]':
      isEmpty = Object.keys(value).length === 0
      break

    case '[object Array]':
      isEmpty = value.length === 0
      break

    case '[object String]':
      if (value.trim().length === 0) {
        isEmpty = true
      }
      break

    default:
      break
  }

  return isEmpty
}

// 对象是否大致相同，忽略其中的 undefined，null 值
export function isObjectApproEqual(obj1, obj2) {
  if (Object.prototype.toString.call(obj1) !== '[object Object]'
    || Object.prototype.toString.call(obj2) !== '[object Object]'
  )
  {
    return isEqual(obj1, obj2)
  }

  const allKeys = uniq([...Object.keys(obj1), ...Object.keys(obj2)])

  let isEql = true
  // 忽略 object 内 key 的顺序，且忽略 undefined，null 值
  allKeys.forEach(function (key) {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (value1 != null || value2 != null) {
      if (Object.prototype.toString.call(value1) === '[object Object]'
        && Object.prototype.toString.call(value2) === '[object Object]'
      ) {
        if (!isObjectApproEqual(value1, value2)) {
          isEql = false
        }
      }
      else if (!isEqual(value1, value2)) {
        isEql = false
      }
    }

  })

  return isEql
}

// 解析字符串 'false' 'FALSE' 'true'
export function formatBoolean(value) {
  const protoType = Object.prototype.toString.call(value)

  if (protoType === '[object String]') {
    if (value.match(/^false$/i)) {
      return false
    }

    if (value.match(/^true$/i)) {
      return true
    }
  }

  return Boolean(value)
}

export function formatNumber(value, options = {}) {

  value = toNumber(value)
  if (isNaN(value)) {
    value = typeof options.defaultValue === 'number'
        ? options.defaultValue
        : 0
  }

  if (typeof options.max === 'number' && value > options.max) {
    value = options.max
  }

  if (typeof options.min === 'number' && value < options.min) {
    value = options.min
  }

  if (typeof options.decimalPrecision === 'number') {
    value = NP.round(value, options.decimalPrecision)
  }

  return value

}
