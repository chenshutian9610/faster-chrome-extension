'use strict'

chrome.storage.sync.get('url', data => {
  chrome.tabs.getCurrent(tab => chrome.tabs.update(tab.id, {url: data.url}))
})