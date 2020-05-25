// 获取请求数据
import { get } from '../utils/request'
// const baseUrl = 'http://192.168.1.104:8015'
const API_URL = 'https://test.youbaobao.xyz:18081'
const APP_ID = 'wx531763b0ca4d661f'
const APP_SECRET = 'b0fde5ac6a9c5e3538dd17d047d9bc49'

// 获取户主用户数据(模拟请求)
export function getOwnerData () {
  return get(`${API_URL}/book/home/recommend/v2`)
}

// 获取 openId
export function getOpenId (code) {
  // openId: 微信小程序的appId,
  // code: 通过 mpvue.login 获取的
  // secret： 小程序的secret key
  return get(`${API_URL}/openId/get`, {
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}
