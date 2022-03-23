import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './assets/my-theme-antd.less'
import store from './store'
Vue.use(Antd)

import 'iview/dist/styles/iview.css'; // 使用 CSS
import './assets/common.less';
import iView from 'iview';
Vue.use(iView);

import ResSplitPane from "vue-resize-split-pane";
Vue.component('rs-panes', ResSplitPane);

import projectItem from "@/views/project/components/projectItem";
Vue.component("projectItem",projectItem)

import layout2 from './components/layout2/layout2'
// eslint-disable-next-line vue/multi-word-component-names
Vue.component("layout2",layout2)

import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

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
