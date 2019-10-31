'use strict'

chrome.storage.sync.get('qrcode', data => {
    new QRCode(document.getElementById('qrcode'), {
        text: data.qrcode,
        width: 600,
        height: 600,
        correctLevel: 0
      })
})