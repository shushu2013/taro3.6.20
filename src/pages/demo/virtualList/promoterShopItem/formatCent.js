import NP from 'number-precision'

import { isEmpty } from './dataType'
import formatMoney from './formatMoney'

export default function formatCent(value, maxDecimals) {
  if (isEmpty(value)) {
    return ''
  }

  return formatMoney(
    NP.divide(value, 100),
    maxDecimals
  )
}
