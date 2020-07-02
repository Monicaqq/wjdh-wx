// 获取请求数据
import { post, get } from '../utils/request'

// 微信绑定
export function bindWechat (url, params) {
  return post(`${url}/app/bind`, params)
}
// 隐藏登录获取token
export function loginWechat (url, params) {
  return post(`${url}/app/login`, params)
}

// 邀请码验证
export function checkCode (url, params) {
  return post(`${url}/roomInviteCode/checkCode`, params)
}

// 身份证号、手机号 人员查询 (无该人员, 进行注册; 有,则跳转至授权页)
export function selectPerson (url, params) {
  return post(`${url}/appPerson/selectPerson`, params)
}
// 提交注册
export function personSave (url, params) {
  return post(`${url}/appPerson/personSave`, params)
}

// app首页, 人员信息
export function getPersonMess (url) {
  return get(`${url}/appPerson/personMess`)
}

// 获取房间下住户信息不包含自己
export function getHouseHoldList (url, params) {
  return post(`${url}/appPerson/list`, params)
}

// 新增成员
export function addPerson (url, params) {
  return post(`${url}/appPerson/save`, params)
}

// 人脸检测
export function faceDetect (url, params) {
  return post(`${url}/person/facePic`, params)
}

// 户主修改车辆信息
export function updateCar (url, params) {
  return post(`${url}/person/updateCar`, params)
}

// 住户人员详情
export function getHouseHoldInfo (url, params) {
  return post(`${url}/appPerson/info`, params)
}

// 住户删除
export function deleteHouseHold (url, params) {
  return post(`${url}/appPerson/deleteRoom`, params)
}

// 报修列表
export function getRepairList (url, params) {
  return post(`${url}/api/repairRequisition/listByMobile`, params)
}

// 报修申请
export function saveRepair (url, params) {
  return post(`${url}/api/repairRequisition/save`, params)
}
// 报修处理
export function handleRepair (url, params) {
  return post(`${url}/api/repairRequisition/handleByOwner`, params)
}
// 报修取消
export function cancelRepair (url, params) {
  return post(`${url}/api/repairRequisition/cancel`, params)
}

// 邀请权限判断
export function isInvitation (url, params) {
  return get(`${url}/cmVisitor/isInvitation?houId=`, params)
}

// 访客邀请
export function toInvite (url, params) {
  return post(`${url}/cmVisitor/invitation`, params)
}

// 访客邀请列表
export function getInviteList (url, params) {
  return post(`${url}/cmVisitor/list`, params)
}
// 住户信息修改
export function updateHouseHold (url, params) {
  return post(`${url}/appPerson/update`, params)
}
// 通知列表
export function getInfoList (url, params) {
  return post(`${url}/api/notice/listByMobile`, params)
}

// 通知详情
export function getInfoDetail (url, params) {
  return get(`${url}api/notice/info?id=`, params)
}

// 邀请码新增
export function qrCodeAdd (url, params) {
  return post(`${url}/appPerson/qrCodeAdd`, params)
}
