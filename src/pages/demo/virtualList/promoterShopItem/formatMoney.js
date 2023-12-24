import { padEnd } from 'lodash-es'

export default function formatMoney(value, maxDecimals) {
  value = '' + value

  let parts = value.split('.')

  let list = [ ], end = parts[0].length - 1
  for (let i = end; i >= 0; i--) {
    if (i !== end && (end - i) % 3 === 0) {
      list.push(',')
    }
    list.push(parts[0].charAt(i))
  }

  let money = list.reverse().join('')
  let decimal = parts[1]
  if (decimal) {
    if (maxDecimals > 0) {
      decimal = padEnd(decimal, maxDecimals, '0')

      if (decimal.length > maxDecimals) {
        decimal = decimal.slice(0, maxDecimals)
      }
    }
  }
  else if (maxDecimals > 0) {
    decimal = padEnd('', maxDecimals, '0')
  }
  if (decimal) {
    money += '.' + decimal
  }
  return money
}
