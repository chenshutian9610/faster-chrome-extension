'use strict'

document.body.onkeydown = event => {
  if (event.key == 'Escape') {
      chrome.windows.getCurrent(win => chrome.windows.remove(win.id))
  }
}