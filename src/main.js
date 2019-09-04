import Vue from 'vue'
import Vant from 'vant';
import App from './App.vue'
import 'vant/lib/index.css';
import router from './router/index'
Vue.use(Vant);

import FastClick from 'fastclick'
FastClick.attach(document.body)


import 'lib-flexible'
import 'amfe-flexible';
import './assets/styles/reset.css'
Vue.config.productionTip = false

window._vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
