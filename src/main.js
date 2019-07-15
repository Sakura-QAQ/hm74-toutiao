import Vue from 'vue'
import App from './App.vue'

import EleMent from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 默认索引（文件夹下如果存在index.js index.vue index.json 默认加载）
// 使用vue-cli的时候 @符号值路径中作为前缀使用时代表src目录
import router from '@/router'

// 导入axios
import axios from '@/api/axios'

Vue.prototype.$http = axios

Vue.use(EleMent)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
