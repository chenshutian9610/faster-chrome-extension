'use strict'

var engines = [
  {
    name: 'baidu',
    value: 'https://www.baidu.com/s?wd=%s'
  },
  {
    name: 'github',
    value: 'https://github.com/search?q=%s'
  },
  {
    name: 'maven',
    value: 'https://mvnrepository.com/search?q=%s'
  },
  {
    name: 'douban',
    value: 'https://www.douban.com/search?q=%s'
  },
  {
    name: 'extension',
    value: 'https://chrome.google.com/webstore/search/%s?hl=zh-C'
  }
]

export default {
  engines
}
