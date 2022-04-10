import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import ElementUI from 'element-ui' //element-ui的全部组件
// import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
// Vue.use(ElementUI) //使用elementUI

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './assets/my-theme-antd.less'
import store from './store'
Vue.use(Antd);

import 'view-design/dist/styles/iview.css'; // 使用 CSS
import './assets/common.less';
// import iView from 'iview';
// Vue.use(iView);
import ViewUI from 'view-design';
// import style
// import 'view-design/dist/styles/iview.css';

import mavonEditor from "mavon-editor";
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);

Vue.use(ViewUI);

import ResSplitPane from "vue-resize-split-pane";
Vue.component('rs-panes', ResSplitPane);

import projectItem from "@/views/project/components/projectItem";
Vue.component("projectItem",projectItem)

import layout2 from './components/layout2/layout2'
// eslint-disable-next-line vue/multi-word-component-names
Vue.component("layout2",layout2)

import vuescroll from 'vuescroll';
Vue.use(vuescroll, {
  ops: {
    mode: 'native',
    sizeStrategy: 'percent',
    detectResize: true,
    locking: true,
    bar: {
      background:"#658885",
    },
    rail: {
      size: '4px',
      gutterOfSide: '1px',
    }
  },

});

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
