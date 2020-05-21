import { response } from 'express'

// 初始化 flyio 对象
function createFly () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

// 处理 get 请求
export function get (url, params = {}, showError = true) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params)
        .then(response => {
          if (response && response.data && response.data.error_code === 0) {
            resolve(response)
          } else {
            if (showError) {
              const msg = (response && response.data && response.data.msg) || '请求失败'
              mpvue.showToast({
                title: msg,
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
// 处理 post 请求
export function post (url, params = {}, showError = true) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params)
        .then(response => {
          if (response && response.length > 0 && response.data.error_code === 0) {
            resolve(response)
          } else {
            if (showError) {
              const msg = (response && response.data && response.data.msg) || '请求失败'
              mpvue.showToast({
                title: msg,
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