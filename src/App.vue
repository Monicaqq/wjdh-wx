<template>
  <div id="app">
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    // let logs
    // if (mpvuePlatform === 'my') {
    //   logs = mpvue.getStorageSync({ key: 'logs' }).data || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync({
    //     key: 'logs',
    //     data: logs
    //   })
    // } else {
    //   logs = mpvue.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync('logs', logs)
    // }
  },
  // log () {
  //   console.log(`log at:${Date.now()}`)
  // }
}
</script>
<style lang='scss'>
page,
html,
body {
  height: 100%;
  position: fixed;
}
.nav-bar {
  .nav-title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
}
// 选择车辆类型的倒三角图标
.choose-icon {
  // width: 12px;
  // height: 8px;
  margin-left: 14.5px;
  margin-right: 23px;
  position: relative;
  // background: rgba(100, 159, 246, 1);
  .triangle {
    width: 0px;
    height: 0px;
    position: absolute;
    top: -2px;
    border: 4px solid #649ff6;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
