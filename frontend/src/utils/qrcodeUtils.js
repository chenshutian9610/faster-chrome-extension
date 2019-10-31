import QRCode from 'qrcodejs2'

/**
 * 创建二维码
 *
 * @param {string} domID DOM 对象的 id, 用于存放二维码的地方
 * @param {string} content 二维码所表达的内容
 * @param {number} [size=120] 二维码的宽度
 */
function generate (domID, content, size = 120) {
  return new QRCode(domID, {
    text: content,
    width: size,
    height: size,
    correctLevel: 0
  })
}

/**
 * 刷新二维码
 *
 * @param {object} qrcode 刷新的二维码对象
 * @param {string} content 二维码所表达的内容
 */
function refresh (qrcode, content) {
  qrcode.clear()
  qrcode.makeCode(content)
}

export default {
  generate,
  refresh
}
