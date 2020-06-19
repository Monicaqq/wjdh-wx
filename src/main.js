import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
// import { API_URL } from './api/index'
// import { setStorageSync } from '@/api/wechat'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
// Vue.prototype.$pathIndex = API_URL
App.mpType = 'app'
// const base_url = 'http://192.168.1.141:8848/face-community-server'
// setStorageSync('base_url', base_url)

const app = new Vue(App)
app.$mount()
