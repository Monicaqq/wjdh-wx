import { loginWechat } from '../api/index'
// 获取code
export function getCode (onSuccess, onFail) {
  mpvue.login({
    success (res) {
      let code = res.code
      if (code) {
        console.log(code)
        onSuccess(code)
      } else {
        onFail(res)
      }
    }
  })
}

// 获取token
export function getToken (onSuccess, onFail) {
  mpvue.login({
    success (res) {
      let code = res.code
      if (code) {
        loginWechat({
          'data': {
            'code': code
          }
        }).then(res => {
          console.log(res)
          // onSuccess(res)
          if (res.data.code === 200) {
            console.log('token', res)
            const token = res.data.data.jwt
            const appId = res.data.data.appId
            setStorageSync('token', token)
            setStorageSync('appId', appId)
            onSuccess(token)
          } else {
            onFail(err)
          }
        }).catch(err => {
          onFail(err)
        })
      }
    },
    fail (err) {
      onFail(err)
    }
  })
}

// 选择照片
export function chooseWxImage (type, onSuccess) {
  mpvue.chooseImage({
    count: 1,
    size: ['compressed'],
    sourceType: [type],
    success: res => {
      // const tempFilePaths = res.tempFilePaths
      onSuccess(res.tempFilePaths)
    },
    fail: err => {
      console.log(err)
    }
  })
}

// 将url图片转为base64 格式
export function transformBase64 (imgPath, onSucess) {
  mpvue.getFileSystemManager().readFile({
    filePath: imgPath,
    encoding: 'base64',
    success: res => {
      onSucess(res)
    },
    fail: err => {
      console.log(err)
    }
  })
}

// 将数据保存到缓存中
export function setStorageSync (key, data) {
  const nowTime = Date.parse(new Date())
  const expiration = nowTime + 7200000
  // const expiration = nowTime + 60000
  // 当前时间 > 2小时后, 缓存就过期了, 就清除缓存, 再重新获取缓存
  if (nowTime > expiration) {
    mpvue.clearStorageSync()
    console.log('清除缓存')
    mpvue.setStorageSync(key, data)
  } else {
    mpvue.setStorageSync(key, data)
  }
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
    title: '加载中'
  })
}
// hidLoading
export function hideLoading () {
  mpvue.hideLoading()
}
