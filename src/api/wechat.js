// 获取code
export function getCode (onSuccess, onFail) {
  mpvue.login({
    success (res) {
      // console.log(res)
      let code = res.code
      if (code) {
        console.log(code)
        onSuccess(code)
      } else {
        onFail(res)
      }
    },
    fail (err) {
      console.log(err)
    }
  })
}

// 将数据保存到缓存中
export function setStorageSync (key, data) {
  mpvue.setStorageSync(key, data)
}
// 获取缓存数据
export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}
// 动态切换页面底部的标题
export function setNavigationBarTitle (title) {
  mpvue.setNavigationBarTitle({
    title
  })
}
// showToast
export function showToast (title) {
  mpvue.showToast({
    title,
    duration: 2000,
    icon: 'none'
  })
}

// showLoading
export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}
