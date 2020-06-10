<template>
  <!-- 住户界面 -->
  <div class="house-hold-container">
    <nav-bar navTitle='住户信息' @clickLeft='goBack'></nav-bar>
    <!-- <img :src="houseHoldDetail." alt=""> -->
    <!-- 住户个人信息部分 -->
    <household-msg ref='child' :personMsg='houseHoldDetail' :regPhoto='regPhoto' :car='car' :rooms='rooms'
      :cardNum='cardNum'>
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
import { getHouseHoldInfo, deleteHouseHold, updateHouseHold } from '../../api/index'
export default {
  components: { householdMsg, submitBtn, navBar },
  mounted () {
    this.houId = this.$route.query.houId
    this.id = this.$route.query.personId
    this.getHouseHolderInfo()
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
      isInvitation: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push('../../pages/index/main')
      this.updateHouseHold()
    },
    getHouseHolderInfo () {
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
        that.roomId = that.rooms[0].roomId
        that.isPass = that.rooms[0].isPass
        that.isInvitation = that.rooms[0].isInvitation
        // console.log(typeof (that.rooms[0].isInvitation))
        console.log('houdeHolder', that.houseHoldDetail)
      })
    },
    delHousePerson () {
      let that = this
      deleteHouseHold({
        'data': {
          'id': that.houId,
          'personId': that.id
        }
      }).then(res => {
        console.log('delHouseHold', res)
      })
    },
    // 更改住户信息
    updateHouseHold () {
      let that = this
      let child = this.$refs.child
      this.isPass = child.isPass
      this.isInvitation = child.isInvitation
      console.log(child.isPass)
      updateHouseHold({
        'data': {
          'houId': that.houId,
          'personId': that.id,
          'roomId': that.roomId,
          'isPass': that.isPass,
          'isInvitation': that.isInvitation
        }
      }).then(res => {
        console.log(res)
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
  width: 100%;
  // height: 100%;
  background-color: #f7f7f7;
  .submit-btn {
    width: 100%;
    height: 40px;
    // position: absolute;
    // bottom: 0;
  }
}
</style>
