import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 单位转换rem
import 'amfe-flexible/index.js'

// 引入vant
import Vant from 'vant';
import { Toast } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
  
// 导入字体图标
// import '@/assets/fonts/iconfont.css'

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.timeout = 8000
// axios.defaults.baseURL = ' http://m2qujf.natappfree.cc'
axios.defaults.baseURL = 'http://117.34.72.243:8885'


//请求拦截
axios.interceptors.request.use(config=>{
  //加载动画的时候把config return 回去
  return config;
},error => {
  Toast.fail('服务器请求超时');
  return Promise.resolve(error)
})
//响应拦截
axios.interceptors.response.use(response=>{
  //结束时把response return回去
  return response;
},error => {
  //错误提醒
  // 对响应错误做点什么
  Toast.fail('服务器响应失败');
  return Promise.reject(error)
})


// 格式化时间的过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})

// html标签过滤器
Vue.filter('txt_gl', function (str) {
  str = str.replace(/<\/?[^>]*>/g,'') //去除HTML tag
  str = str.replace(/[ | ]*\n/g,'\n') //去除行尾空白
  str=str.replace(/&nbsp;/ig, '')
  str=str.replace(/&ldquo;/ig, '“')
  str=str.replace(/&rdquo;/ig, '”')
  str=str.slice(0,200)
  return str;
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
