<template>
  <el-tabs id='tab' v-model="activeTab" @tab-click="initTab" style="width: 400px">
    <el-tab-pane :name="tabs[0]" label="搜索">
      <search ref='search'/>
    </el-tab-pane>
    <el-tab-pane :name="tabs[1]" label="二维码">
      <qrcode ref='qrcode'/>
    </el-tab-pane>
    <el-tab-pane :name="tabs[2]" label="剪切板">
      <snippet ref='snippet'/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import search from './search.vue'
  import qrcode from './qrcode.vue'
  import snippet from './snippet.vue'
  export default {
    components: {search, qrcode, snippet},
    data() {
      return {
        activeTab: 'search',
        tabs: ['search', 'qrcode', 'snippet'],
      }
    },
    methods: {
      // 初始化时给页面绑定快捷键
      init() {
        // 全局快捷键, Ctrl + 方向键, 切换 Tab 页
        let body = document.getElementsByTagName('body')[0]
        body.onkeydown = event => {
          if (event.ctrlKey && (event.key == 'ArrowRight' || event.key == 'ArrowLeft')) {
            let index = this.tabs.findIndex(tab => tab == this.activeTab)
            if (event.key == 'ArrowRight' && index < this.tabs.length - 1) {
              index++
            } else if (event.key == 'ArrowLeft' && index > 0) {
              index--
            }
            // 切换 Tab 页并初始化其数据
            this.activeTab = this.tabs[index]
            this.initTab()
          }
        }
        // 获取局域网 ip
        this.$ip.getIP.bind(this)(res => {
          this.$refs.qrcode.localhost = res.data[0]
          this.$refs.snippet.localhost = res.data[0]
        })
        // 初始化当前 Tab 页
        this.initTab()
      },
      // 当 Tab 页改变后初始化相应的 Tab 页
      initTab() {
        setTimeout(() => {
          this.$refs[this.activeTab].load()
        }, 100);
      },
    },
    mounted() {
      this.init()
    },
  }
</script>