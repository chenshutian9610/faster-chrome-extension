<template>
  <div>
    <table>
      <tr>
        <td>
          <div id='qrcodeImg' class='qrcode-image' @dblclick="showDialog()"></div>
        </td>
        <td>
          <el-input ref="qrcodeText" class="qrcode-input" type="textarea" v-model="qrcodeText" rows='5'></el-input>
        </td>
      </tr>
    </table>
    <ol style="font-size: 8px">
      <li>手机扫描左边二维码进入浏览器当前网页</li>
      <li>右边输入框可以自定义二维码, 结束按 Ctrl + Enter</li>
      <li>双击二维码可查看大图</li>
      <li>使用 Ctrl 加左右方向键可切换 Tab 页</li>
    </ol>
  </div>
</template>
<script>
// import { setTimeout } from 'timers';
  export default {
    data() {
      return {
        localhost: 'localhost',
        qrcode: undefined,
        qrcodeText: '',
      }
    },
    methods: {
      // 初始化时绑定事件
      init() {
        this.$refs.qrcodeText.$el.onkeydown = event => {
          if (event.ctrlKey && event.key == 'Enter') {
            this.refreshQrCode(this.qrcodeText)
          }
        }
      },
      // 加载时刷新二维码
      load() {
        this.$refs.qrcodeText.focus()
        if (chrome && chrome.tabs) {
          chrome.tabs.query({
            'active': true,
            'currentWindow': true
          }, tabs => this.refreshQrCode(tabs[0].url))
        } else {
          this.refreshQrCode(location.href)
        }
      },
      // 封装刷新二维码的 API
      refreshQrCode(content) {
        let generateOrRefresh = function(content) {
          if (this.qrcode) {
              this.$qrcode.refresh(this.qrcode, content)
            } else {
              this.qrcode = this.$qrcode.generate('qrcodeImg', content)
            }
        }.bind(this)
        let regex = /^(http|https)(:\/\/)(localhost|127.0.0.1){1}/
        if (regex.test(content)) {
          // this.$ip.getIP.bind(this)(res => {
            content = content.replace(regex, `$1$2${this.localhost}`)//${res.data[0]}`)
            generateOrRefresh(content)
          // })
        } else {
            generateOrRefresh(content)
        }
      },
      // 使用弹窗来显示二维码
      showDialog() {
        if (chrome && chrome.windows && chrome.storage) {
          chrome.tabs.query({
            'active': true,
            'currentWindow': true
          }, tabs => chrome.storage.sync.set({
            qrcode: this.qrcodeText ? this.qrcodeText : tabs[0].url
          }, () => chrome.windows.create({
            url: 'dialog/qrcode/index.html',
            type: 'popup',
            width: 640,
            height: 655,
            top: 60,
            left: 60
          })))
        }
      },
    },
    mounted() {
      this.init()
    }
  }
</script>
<style scoped>
.qrcode-image {
  margin-right: 6px;
}
.qrcode-input {
  width: 260px;
}
</style>