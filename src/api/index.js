// 获取请求数据
import { post, get } from '../utils/request'
// const API_URL = 'https://angeasy.natapp4.cc/face-community-server'
// const API_URL = 'http://192.168.1.101:8011'
const API_URL = 'http://192.168.1.141:8848/face-community-server'
// const APP_ID = 'wx0dca6b0ff2113744'
// const APP_SECRET = '7d6f8947fdc99e7bf1c7874f21d024ac'

// 微信绑定
export function bindWechat (params) {
  return post(`${API_URL}/app/bind`, params)
}
// 隐藏登录获取token
export function loginWechat (params) {
  return post(`${API_URL}/app/login`, params)
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

// app首页, 人员信息
export function getPersonMess () {
  return get(`${API_URL}/appPerson/personMess`)
}

// 获取房间下住户信息不包含自己
export function getHouseHoldList (params) {
  return post(`${API_URL}/appPerson/list`, params)
}

// 新增成员
export function addPerson (params) {
  return post(`${API_URL}/appPerson/save`, params)
}

// 人脸检测
export function faceDetect (params) {
  return post(`${API_URL}/person/facePic`, params)
}

// 户主修改车辆信息
export function updateCar (params) {
  return post(`${API_URL}/person/updateCar`, params)
}

// 住户人员详情
export function getHouseHoldInfo (params) {
  return post(`${API_URL}/appPerson/info`, params)
}

// 住户删除
export function deleteHouseHold (params) {
  return post(`${API_URL}/appPerson/deleteRoom`, params)
}

// 报修列表
export function getRepairList (params) {
  return post(`${API_URL}/api/repairRequisition/listByMobile`, params)
}

// 报修申请
export function saveRepair (params) {
  return post(`${API_URL}/api/repairRequisition/save`, params)
}
// 报修处理
export function handleRepair (params) {
  return post(`${API_URL}/api/repairRequisition/handleByOwner`, params)
}
// 报修取消
export function cancelRepair (params) {
  return post(`${API_URL}/api/repairRequisition/cancel`, params)
}

// 邀请权限判断
export function isInvitation (params) {
  return get(`${API_URL}/cmVisitor/isInvitation?houId=`, params)
}

// 访客邀请
export function toInvite (params) {
  return post(`${API_URL}/cmVisitor/invitation`, params)
}

// 访客邀请列表
export function getInviteList (params) {
  return post(`${API_URL}/cmVisitor/list`, params)
}
// 住户信息修改
export function updateHouseHold (params) {
  return post(`${API_URL}/appPerson/update`, params)
}
// 通知列表
export function getInfoList (params) {
  return post(`${API_URL}/api/notice/listByMobile`, params)
}

// 通知详情
export function getInfoDetail (params) {
  return get(`${API_URL}api/notice/info?id=`, params)
}

export { API_URL }
