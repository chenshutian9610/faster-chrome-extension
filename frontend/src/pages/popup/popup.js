// 导入框架
import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 导入资源文件
import Popup from './popup.vue'
import Index from './components/index.vue'
import qrcodeUtils from '@/utils/qrcodeUtils.js'
import ipUtils from '@/utils/ipUtils.js'
import stringUtils from '@/utils/stringUtils.js'
// 设置超时, 3 秒
axios.defaults.timeout = 3000

Vue.prototype.$axios = axios
Vue.prototype.$qrcode = qrcodeUtils
Vue.prototype.$string = stringUtils
Vue.prototype.$ip = ipUtils

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#popup',
  components: { Popup },
  template: '<Popup/>',
  router: new Router({
    routes: [
      {
        path: '/',
        name: 'Index',
        component: Index
      }
    ]
  })
})
