// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import './store/font'
import store from './store/index';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { ConfigPlugin } from 'vux'
// 防止模态框出现页面可以滚动
// Vue.use(ConfigPlugin, {
//   $layout: 'VIEW_BOX'
// })
import {
  ConfirmPlugin,
  ToastPlugin,
  LoadingPlugin,
  AlertPlugin
} from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
// 复制粘贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 生成二维码

//中英文切换
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import cn from "./base/lang/cn"
// import ct from "./base/lang/ct"
import en from "./base/lang/en"
const i18n = new VueI18n({
  locale: store.state.lang,
  messages: {
    'cn': cn,
    // 'ct': ct,
    'en': en,
  }
});
Vue.$i18n = i18n;
Vue.prototype.setLang = function (l) {
    this.$i18n.locale = l;
    store.state.lang=l;
    localStorage.setItem("lang",l);
};
// axios
import axios from 'axios'
import Qs from 'qs'
// Axios.defaults.headers.common['Authentication-Token'] = store.state.token;
//解决axios发送两次请求
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.transformRequest = [obj => Qs.stringify(obj)]
//解决验证码比对不正确 (跨域)
axios.defaults.withCredentials = true //
//指定baseurl
const BASE_URL = 'http://fd.qilinpz.com/api/';
axios.defaults.baseURL=BASE_URL;

Vue.prototype.$http = axios
Vue.config.productionTip = false
// 响应拦截器
axios.interceptors.response.use(
response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  if (response.status === 200) {
    if (response.data.code == -1) { // 登录过期去登录页
       Vue.$vux.toast.show({
       text: "该账号在别处登录，请重新登录！",
       type: "cancel",
       position: "middle",
       time: 1200
     });
    return router.replace({
        path: '/',
      });
    } else {

    }
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
},
error => {
  // 否则的话抛出错误
  if (error.response.status) {
    return Promise.reject(error.response);
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
