<template>
  <div id="app" class="fillcontain">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
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
