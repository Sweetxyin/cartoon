import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// 引用axios，并设置基础URL为后端服务api地址
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000;
// 将API方法绑定到全局
Vue.prototype.$axios = axios

//设置用json的方式传，不然增删改查会报错
axios.defaults.headers ={
  "Content-Type":"application/json;charset=UTF-8",
  "Access-Control-Allow-Methods": "*"
}


Vue.config.productionTip = false

 /* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
