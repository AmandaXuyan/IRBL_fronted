import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
Vue.use(Antd)

import 'iview/dist/styles/iview.css'; // 使用 CSS
import './assets/common.less';
import iView from 'iview';
Vue.use(iView);

Vue.config.productionTip = false

Vue.directive('title', {
  // eslint-disable-next-line no-unused-vars
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
