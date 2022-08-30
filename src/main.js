import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入并安装Vant插件
import Vant from 'vant'
// 定制主题 为了能够覆盖默认的less变量  后缀名一定要改成less
import 'vant/lib/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
