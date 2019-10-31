<template>
  <div>
    <el-radio-group v-model="engine" size="small">
      <el-radio-button v-for="item in engines" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
    </el-radio-group><br><br>
    <el-input ref="keyword" class="input-with-select egine-input" placeholder="请输入关键字" v-model="keyword"></el-input>
    <ol style="font-size: 8px">
      <li>在输入框中使用 Tab 或 Shift + Tab 键切换搜索引擎</li>
      <li>使用 Enter 开始搜索</li>
      <li>使用 Ctrl 加左右方向键可切换 Tab 页</li>
    </ol>
  </div>
</template>
<script>
  import constants from '@/constants.js'
  export default {
    data() {
      return {
        engines: constants.engines,
        engine: constants.engines[0].value,
        keyword: '',
      }
    },
    methods: {
      // 使用搜索引擎
      search() {
        open(this.engine.split('%s').join(this.keyword))
      },
      // 初始化时绑定事件
      init() {
        // 搜索页面
        this.$refs.keyword.$el.onkeydown = event => {
          // 按 tab 键更换搜索引擎
          if (event.key == 'Tab') {
            let index = this.engines.findIndex(item => item.value == this.engine)
            // shift + tab 向上切换
            if (event.shiftKey) {
              if (--index < 0) {
                index = this.engines.length - 1
              }
            }
            // tab 向下切换 
            else if (++index >= this.engines.length) {
              index = 0
            }
            this.engine = this.engines[index].value
            // 屏蔽 tab 键切换功能
            event.returnValue = false
          }
          // 按 enter 键开始搜索
          else if (event.key == 'Enter') {
            this.search()
          }
        }
      },
      // 加载时使文本框聚焦
      load() {
        this.$refs.keyword.focus()
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style scoped>
.egine-input {
    width: 365px
}
.engine-select {
    width: 110px
}
</style>