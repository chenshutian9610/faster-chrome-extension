/**
 * 将长字符串转换为带换行符的字符串
 *
 * @param {string} val 要操作的字符串
 * @param {number} [rows=8] 最大行数
 * @param {number} [cols=36] 最大列数
 * @param {string} [wrapType='<br>'] 换行符
 * @returns
 */
function wrap (val, rows = 8, cols = 36, wrapType = '<br>') {
  let result = ''
  let rowStart = 0
  let rowEnd = 0
  let colIndex = 0
  let currentRow = 1
  for (let c of val) {
    // eslint-disable-next-line no-control-regex
    if (/[^\x00-\xff]/.test(c)) {
      colIndex += 2
    } else {
      colIndex++
    }
    rowEnd++
    if (colIndex >= cols || rowEnd === val.length) {
      colIndex = 0
      result += val.substring(rowStart, rowEnd) + wrapType
      rowStart = rowEnd
      if (++currentRow >= rows) {
        result += '<b>......</b>'
        break
      }
    }
  }
  return result
}

export default {
  wrap
}
