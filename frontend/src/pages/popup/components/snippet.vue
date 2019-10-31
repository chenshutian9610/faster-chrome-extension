<template>
  <div>
    <table>
        <tr>
          <td>
            <div id='qrcodeImg2' class='qrcode-image' @dblclick="showDialog()"></div>
          </td>
          <td>
            <el-button ref='snippet' type='text' @click="go()" style="margin-left: 1em" v-html="snippet.label"></el-button>
          </td>
        </tr>
      </table>
      <ol style="font-size: 8px">
        <li>手机扫描左边二维码分享链接, 双击二维码进入分享页面</li>
        <li>使用快捷键 Ctrl + -> 或 点击上方 "剪切板" 刷新剪切板 </li>
        <li>使用 Ctrl 加左右方向键可切换 Tab 页</li>
      </ol>
  </div>
</template>
<script>
  import constants from '@/constants.js'
  export default {
    data() {
      return {
        snippet: {},
        localhost: 'localhost'
      }
    },
    methods: {
      // 初始化
      init() {
        // 等待 index.vue 初始化 localhost
        setTimeout(() => {
          let url = this.$ip.snippetUrl.replace('localhost', this.localhost)
          this.$qrcode.generate('qrcodeImg2', url)
        }, 400);
      },
      // 加载时时按键聚焦, 并获取分享的文本
      load() {
        this.$ip.getSnippet.bind(this)(res => {
          this.snippet = {
            label: this.$string.wrap(res.data),
            value: res.data
          }
          this.$refs.snippet.$el.focus()
        })
      },
      // 访问共享的网址
      go() {
        if (this.snippet) {
          if (/^(http|https):\/\//.test(this.snippet.value)) {
            open(this.snippet.value)
          } else {
            open(constants.engines[0].value.split('%s').join(this.snippet.value))
          }
        }
      },
      // 使用弹窗来打开分享页面
      showDialog() {
        if (chrome && chrome.windows && chrome.storage) {
          chrome.tabs.query({
            'active': true,
            'currentWindow': true
          }, tabs => chrome.storage.sync.set({
            qrcode: this.qrcodeText ? this.qrcodeText : tabs[0].url
          }, () => chrome.windows.create({
            url: `${this.$ip.snippetUrl}`,
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
    },
  }
</script>