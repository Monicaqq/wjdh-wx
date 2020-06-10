<template>
  <!-- 个人信息界面 -->
  <div class="person-container">
    <nav-bar navTitle='个人信息' @clickLeft='goBack'></nav-bar>
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
    this.personDetail = getStorageSync('personMess')
    // this.getPersonMess()
    console.log(this.PersonDetail)
    // this.personDetail = JSON.parse(this.$route.query.personMess)
    // this.personDetail = this.$route.query.item
    // console.log('perMess', JSON.parse(this.personDetail))
    // console.log(this.personDetail)
  },
  data () {
    return {
      personDetail: getStorageSync('personMess'),
      personMess: {}
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
      // const roomId = this.$refs.child.roomId
      // const roomFullName = this.$refs.child.roomFullName
      const room = {
        roomId: this.$refs.child.roomId,
        roomFullName: this.$refs.child.roomFullName
      }
      console.log(room)
      setStorageSync('room', room)
      this.$router.push('../../pages/index/main')
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
