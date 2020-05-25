import { getOpenId } from '../api/index'
// 获取用户设置, 判断用户是否授权
// auth 作为权限判断, authSetting 中包括 scope.userInfo 和 scope.userLocation
export function getSetting (auth, onSucess, onFail) {
  mpvue.getSetting({
    withSubscription: true,
    success (res) {
      if (res.authSetting[`scope.${auth}`]) {
        onSucess(res)
      } else {
        onFail(res)
      }
      console.log(res)
    },
    fail (err) {
      console.log(err)
    }
  })
}
// 授权成功后, 获取用户信息
export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      console.log(res)
      let userInfo = res.userInfo
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

// 获取 openId: getSetting() -----> getUserInfo(), openId 存在 userInfo 中
export function getUserOpenId (callback) {
  mpvue.login({
    success (res) {
      if (res.code) {
        // 调用 getOpenId 请求时, 将自己的code 传过去, 作为 getOpenId 的其中一个参数
        const code = res.code
        getOpenId(code).then(res => {
          // 将获取的 openId 存放到缓存中
          console.log(res)
          const { data: { data: { openid } } } = res
          setStorageSync('openId', openid)
          // 存储到缓存中再进行回调函数验证是否存在openId
          callback && callback(openid)
          console.log('openid:', openid)
        })
          .catch(err => {
            // 直接抛出异常
            console.log(err)
          })
      } else {
        console.log(res)
      }
      console.log(res)
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
