<template>
  <!-- 住户界面 -->
  <div class="house-hold-container">
    <nav-bar navTitle='住户信息' @clickLeft='goBack'></nav-bar>
    <!-- <img :src="houseHoldDetail." alt=""> -->
    <!-- 住户个人信息部分 -->
    <household-msg ref='child' :personMsg='houseHoldDetail' :regPhoto='regPhoto' :car='car' :rooms='rooms'
      :cardNum='cardNum' :houId='houId' :id='id'>
    </household-msg>
    <!-- 删除住户按钮 -->
    <div class="submit-btn">
      <submit-btn btnText='删除' @submitClick='delHousePerson'></submit-btn>
    </div>
  </div>
</template>
<script>
import householdMsg from '@/components/householdMsg'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
import { getHouseHoldInfo, deleteHouseHold } from '../../api/index'
export default {
  components: { householdMsg, submitBtn, navBar },
  mounted () {
    this.houId = this.$route.query.houId
    this.id = this.$route.query.personId
    this.getHouseHoldInfo()
  },
  data () {
    return {
      houseHoldDetail: {},
      regPhoto: '',
      car: [],
      rooms: {},
      cardNum: '',
      id: '',
      houId: '',
      roomId: '',
      isPass: '',
      isInvitation: '',
      personRegioncode: ''
    }
  },
  methods: {
    goBack () {
      var pages = getCurrentPages()
      var beforePage = pages[pages.length - 2]
      beforePage.onLoad()
      this.$router.go(-1)
    },
    getHouseHoldInfo () {
      let that = this
      getHouseHoldInfo({
        'data': {
          'id': that.id,
          'houId': that.houId
        }
      }).then(res => {
        that.houseHoldDetail = res.data.data
        that.regPhoto = ('data:image/png;base64,' + this.houseHoldDetail.regPhoto).replace(/[\r\n]/g, '')
        that.car = that.houseHoldDetail.car
        that.rooms = that.houseHoldDetail.rooms[0]
        that.cardNum = that.houseHoldDetail.cardNum
        that.roomId = that.rooms.roomId
        that.isPass = that.rooms.isPass
        that.isInvitation = that.rooms.isInvitation
        that.personName = that.houseHoldDetail.personName
      })
    },
    delHousePerson () {
      let that = this
      mpvue.showModal({
        title: '提示',
        content: '确定进行删除操作吗？',
        success (res) {
          if (res.confirm) {
            deleteHouseHold({
              'data': {
                'id': that.houId,
                'personId': that.id
              }
            }).then(res => {
              console.log('delHouseHold', res)
              if (res.data.code === 200) {
                that.$router.go(-1)
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.house-hold-container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-color: #f5f6fa;
  .submit-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
