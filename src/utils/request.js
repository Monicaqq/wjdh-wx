// import { response } from 'express'

// 初始化 flyio 对象
function createFly () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}
// 处理异常
function handleError (err) {
  console.log(err)
}
// 处理 get 请求
export function get (url, params = {}, showError = true) {
  const fly = createFly()
  fly.interceptors.request.use((request) => {
    request.headers = {
      'Content-Type': 'application/json'
    }
  })
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params)
        .then(response => {
          // if (response && response.data && response.data.error_code === 0) {
          //   resolve(response)
          // } else {
          //   if (showError) {
          //     const msg = (response && response.data && response.data.msg) || '请求失败'
          //     mpvue.showToast({
          //       title: msg,
          //       duration: 2000
          //     })
          //   }
          // }
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          handleError(err)
          reject(err)
        })
    })
  }
}
// 处理 post 请求
export function post (url, params = {}, showError = true) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params)
        .then(response => {
          const res = response.data
          if (res && res.code === 200) {
            // console.log('res...', response)
            resolve(response)
          } else {
            if (showError) {
              const msg = (res && res.message) || '请求失败'
              mpvue.showToast({
                title: msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}
