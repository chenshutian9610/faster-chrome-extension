// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let engines = [
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

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    engine: JSON.stringify(engines)
  }, () => {
    console.log('engine is installed')
  })
})

chrome.contextMenus.create({
  id: 'qrcode',
  title: '生成二维码: %s', // %s 表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
})

engines.forEach(engine => {
  chrome.contextMenus.create({
    id: engine.name,
    title: `${engine.name} 搜索: %s`, // %s 表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("info: ", info)
  console.log("tab: ", tab)
  if (info.menuItemId == 'qrcode') {
      chrome.storage.sync.set({
        qrcode: info.selectionText
      }, () => chrome.windows.create({
        url: 'dialog/qrcode/index.html',
        type: 'popup',
        width: 640,
        height: 655,
        top: 60,
        left: 60
      }))
  } else {
    open(engines.filter(engine => engine.name == info.menuItemId)[0].value.split('%s').join(info.selectionText))
  }
})

chrome.commands.onCommand.addListener((cmd) => {
  console.log(cmd)
  switch (cmd) {
    case "close_other_tabs":
      chrome.tabs.query({
        'active': false,
        'pinned': false
      }, tabs => chrome.tabs.remove(tabs.map(tab => tab.id)))
      break
    case "lock_current_tab":
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      }, tabs => chrome.tabs.update(tabs[0].id, {
        pinned: !tabs[0].pinned
      }))
      break
    case "open_extensions":
      chrome.windows.create({
        url: 'chrome://extensions/',
        type: 'popup',
        width: 1020,
        height: 620,
        top: 60,
        left: 60
      })
      break
  }
})

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  if (text) {
    // localhost / 127.0.0.1
    if ('localhost'.indexOf(text) != -1 || '127.0.0.1'.indexOf(text) != -1) {
      suggest([{
          content: 'http://localhost',
          description: 'do you wanna go to http://localhost'
        },
        {
          content: 'http://localhost:8080',
          description: 'do you wanna go to http://localhost:8080'
        },
        {
          content: 'http://localhost:8888',
          description: 'do you wanna go to http://localhost:8888'
        },
        {
          content: 'http://localhost:4000',
          description: 'do you wanna go to http://localhost:4000'
        },
        {
          content: 'http://localhost:8720',
          description: 'do you wanna go to http://localhost:8720'
        },
      ]);
    }
    // port ${port}
    else if (/^port \d+$/.test(text)) {
      let port = text.split(' ')[1]
      suggest([{
        content: 'http://localhost:' + port,
        description: 'do you wanna go to http://localhost:' + port
      }])
    }
    // google ${str}
    else if (/^google .+$/.test(text)) {
      console.log(text)
      let url = 'https://developers.google.com/s/results/?q='
      let keyword = text.split(' ')[1]
      suggest([{
        content: url + keyword,
        description: 'do you wanna search "' + keyword + '" in developers.google.com'
      }])
    }
  }
})

chrome.omnibox.onInputEntered.addListener(text => {
  if (text) {
    chrome.tabs.query({
      'active': true,
      'currentWindow': true
    }, tabs => {
      let url = /^(http|https):\/\//.test(text) ? text : 'https://www.baidu.com/s?wd=' + text
      chrome.tabs.update(tabs[0].id, {
        url: url
      })
    })
  }
})