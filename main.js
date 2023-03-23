import App from './App';
// main.js
import uView from '@/uni_modules/uview-ui';
Vue.use(uView);
import util from './util/index';
import storage from './common/storage';
Vue.prototype.$storage = storage;
Vue.prototype.$util = util;
import request from './util/request';
Vue.prototype.$request = request;
import iconUrl from '@/assets/index.js';
Vue.prototype.$iconUrl = iconUrl;

import store from './store';
Vue.prototype.$store = store;

Vue.prototype.$video_url = 'https://api.jxwsyl.com/jhb-api/'; //正式回调地址

//下拉全局混入
import { index } from '@/mixin/index.js';
Vue.mixin(index);

// #ifndef VUE3
import Vue from 'vue';
App.mpType = 'app';
const app = new Vue({
  ...App,
});
app.$mount();
// #endif
// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
