<template>
  <!-- 个人信息界面 -->
  <div class="person-container">
    <nav-bar navTitle='个人信息' @clickLeft='goBack'></nav-bar>
    <!-- 个人信息 + 住户信息 -->
    <person-msg isPerson :personMsg='personDetail' :carLen='carLen' ref='child'></person-msg>
  </div>
</template>
<script>
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import personMsg from '@/components/personMsg'
import navBar from '@/components/navBar'
import { getStorageSync, setStorageSync } from '../../api/wechat'
import { getPersonMess } from '../../api/index'
const log = require('../../log')
export default {
  components: { avatorImg, arrowBtn, personMsg, navBar },
  onLoad () {
    this.personDetail = getStorageSync('personMess')
    this.carLen = this.personDetail.car.length
    this.baseUrl = getStorageSync('base_url')
  },
  onShow () {
    this.getPersonMess()
    log.info('hello test')
    log.warn('warn')
    log.error('error')
    log.setFilterMsg('filterkeyword')
    log.setFilterMsg('addfilterkeyword')

  },
  watch: {
    carLen (newVal) {
      this.carLen = newVal
    }
  },
  data () {
    return {
      baseUrl: null,
      personDetail: getStorageSync('personMess'),
      carLen: 0
    }
  },
  methods: {
    // 获取个人信息
    getPersonMess () {
      let that = this
      getPersonMess(that.baseUrl).then(res => {
        that.personMess = res.data.data
        setStorageSync('personMess', that.personMess)
      })
    },
    // 返回上一页
    goBack () {
      this.$router.push('../../pages/home/main')
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
