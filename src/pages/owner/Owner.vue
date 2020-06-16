<template>
  <!-- 个人信息界面 -->
  <div class="person-container">
    <nav-bar navTitle='个人信息' :carLen='carLen' @clickLeft='goBack'></nav-bar>
    <!-- 个人信息 + 住户信息 -->
    <person-msg isPerson :personMsg='personDetail' ref='child'></person-msg>
  </div>
</template>
<script>
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import personMsg from '@/components/personMsg'
import navBar from '@/components/navBar'
import { getStorageSync, setStorageSync } from '../../api/wechat'
import { getPersonMess } from '../../api/index'
export default {
  components: { avatorImg, arrowBtn, personMsg, navBar },
  mounted () {
    // this.personDetail = getStorageSync('personMess')
    // this.getPersonMess()
    // console.log(this.PersonDetail)
    // this.personDetail = JSON.parse(this.$route.query.personMess)
    // this.personDetail = this.$route.query.item
    // console.log('perMess', JSON.parse(this.personDetail))
    // console.log(this.personDetail)
    // this.carLen = JSON.parse(this.$route.query.carLen)
    // console.log(typeof (this.carLen))
  },
  watch: {
    carLen (newVal) {
      this.carLen = newVal
      console.log(this.carLen)
    }
  },
  data () {
    return {
      personDetail: getStorageSync('personMess'),
      personMess: {},
      carLen: 0
    }
  },
  methods: {
    // 获取个人信息
    getPersonMess () {
      let that = this
      getPersonMess().then(res => {
        that.personMess = res.data.data
        setStorageSync('personMess', that.personMess)
      })
    },
    // 返回上一页
    goBack () {
      var pages = getCurrentPages()
      var beforePage = pages[pages.length - 2]
      beforePage.onLoad()
      this.$router.go(-1)
    },
    // 跳转至手机号界面
    // toTelView () {
    //   this.$router.push('../../pages/telphone/main')
    // },
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
  background: #f5f6fa;
}
</style>
