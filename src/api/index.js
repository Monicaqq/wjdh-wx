// 获取请求数据
import { post } from '../utils/request'
const API_URL = 'http://192.168.1.101:8011'
// const API_URL = 'http://192.168.1.141:8848/face-community-server'
// const APP_ID = 'wx0dca6b0ff2113744'
// const APP_SECRET = '7d6f8947fdc99e7bf1c7874f21d024ac'

// 微信绑定
export function bindWechat (params) {
  return post(`${API_URL}/app/bind`, params)
}
// 隐藏登录获取token
export function loginWechat (params) {

}

// 邀请码验证
export function checkCode (params) {
  return post(`${API_URL}/roomInviteCode/checkCode`, params)
}

// 身份证号、手机号 人员查询 (无该人员, 进行注册; 有,则跳转至授权页)
export function selectPerson (params) {
  return post(`${API_URL}/appPerson/selectPerson`, params)
}
// 提交注册
export function personSave (params) {
  return post(`${API_URL}/appPerson/personSave`, params)
}
