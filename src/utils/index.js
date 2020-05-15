function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// 手机号格式校验
function isName (name) {
  var nameReg = /^[\u4E00-\u9FA5]{2,4}$/
  if (name.length === 0) {
    return '请输入姓名'
  } else if (!nameReg.test(name)) {
    return '姓名仅支持2-4个中文字符'
  }
}
// 身份证格式校验
// function isCardId (sId) {
//   var aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
//   let iSum = 0
//   const info = ''
//   if (!/^\d{17}(\d|x)$/i.test(sId)) {
//     return '你输入的身份证长度或格式错误'
//   }
//   sId = sId.replace(/x$/i, 'a')
//   if (aCity[parseInt(sId.substr(0, 2))] == null) {
//     return '你的身份证地区非法'
//   }
//   sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))
//   const d = new Date(sBirthday.replace(/-/g, '/'))
//   if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
//     return '身份证上的出生日期非法'
//   }
//   for (var i = 17; i >= 0; i--) {
//     iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
//   }
//   if (iSum % 11 !== 1) {
//     return '你输入的身份证号非法'
//   }
//   return true
// }
// 身份证号部分字段隐藏
function hidden (str, startLen, endLen) {
  let len = str.length - startLen - endLen
  var star = ''
  for (let i = 0; i < len; i++) {
    star += '*'
  }
  return str.substr(0, startLen) + star + str.substr(str.length - endLen)
}

export default {
  formatNumber,
  formatTime,
  isName,
  hidden
}
