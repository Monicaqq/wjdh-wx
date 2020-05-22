<template>
  <!-- 个人信息界面 -->
  <div class="person-container">
    <nav-bar navTitle='个人信息'></nav-bar>
    <!-- 个人信息 + 住户信息 -->
    <person-msg isPerson></person-msg>
  </div>
</template>
<script>
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import personMsg from '@/components/personMsg'
import navBar from '@/components/navBar'
export default {
  components: { avatorImg, arrowBtn, personMsg, navBar },
  mounted () {
  },
  data () {
    return {
      personMsg: {
        perPhoto: '../../static/images/timg.jpg',
        carsTotal: 2
      }
    }
  },
  methods: {
    // 返回上一页
    onClickLeft () {
      this.$router.go(-1)
    },
    // 跳转至手机号界面
    toTelView () {
      this.$router.push('../../pages/telphone/main')
    },
    // 点击 选择户址
    chooseAddress () {
      console.log('选择户址')
    },
    // 选择人员类型
    choosePersonType () {
      console.log('选择人员类型')
    },
    // 去车辆界面
    toCarView () {
      this.$router.push('../../pages/cars/main')
    }
  }
}
</script>
<style lang="scss" scoped>
.person-container {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
}
</style>
