<template>
  <div class="repair-apply-container">
    <nav-bar navTitle='报修' @clickLeft='goBack'></nav-bar>
    <form @submit="applyRepair">
      <div class="apply-type">
        <span>类型</span>
        <div class="repair-type">
          <input type="text" v-model="repairType" @click="chooseRepairType" disabled>
          <!-- <span>公共设施</span> -->
          <arrow-btn color='#D2D7F0' @arrowClick='chooseRepairType'></arrow-btn>
        </div>
      </div>
      <div class="apply-detail">
        <span>详细</span>
        <div class="detail-text">
          <input type="text" v-model="repairContent" placeholder="请输入报修详细信息" maxlength="200">
        </div>
      </div>
      <div class="submit-btn">
        <submit-btn btnText='提交' isActive></submit-btn>
      </div>
    </form>
  </div>
</template>
<script>
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
import { saveRepair } from '../../api/index'
import { getStorageSync, showToast } from '../../api/wechat'
import { trim } from '../../utils/index'
export default {
  components: { arrowBtn, submitBtn, navBar },
  mounted () {
    Object.assign(this.$data, this.$options.data())
    const personMess = getStorageSync('personMess')
    this.roomId = personMess.rooms[0].roomId
  },
  inject: ['reload'],
  data () {
    return {
      repairType: '公共设施',
      repairTypeCode: 1,
      repairContent: '',
      roomId: ''
    }
  },
  methods: {
    goBack () {
      // this.$router.push('../../pages/index/main')
      this.$router.go(-1)
    },
    chooseRepairType () {
      let that = this
      wx.showActionSheet({
        itemList: ['公共设施', '户内设施'],
        success (res) {
          if (res.tapIndex === 0) {
            that.repairType = '公共设施'
            that.repairTypeCode = 1
          } else {
            that.repairType = '户内设施'
            that.repairTypeCode = 2
          }
        }
      })
      console.log('选择报修类型')
    },
    applyRepair () {
      let that = this
      if (trim(that.repairContent).length === 0) {
        showToast('报修内容不能为空')
      } else {
        saveRepair({
          'data': {
            'repairType': that.repairTypeCode,
            'repairContent': that.repairContent,
            'roomId': that.roomId
          }
        }).then(res => {
          console.log(res)
          this.$router.push('../../pages/index/main')
          this.reload()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.repair-apply-container {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #eee;
  color: #333;
  font-size: 14px;
  .apply-type {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    margin-left: 15px;
    margin-right: 15px;
    line-height: 44px;
    border-bottom: 0.5px solid #eee;
    .repair-type {
      display: flex;
      flex-direction: row;
      align-items: center;
      input {
        margin-right: 16px;
        text-align: right;
        color: #666;
      }
    }
  }
  .apply-detail {
    margin: 15px 15px;
    // margin-left: 15px;
    // margin-right: 15px;
    .detail-text {
      height: 100px;

      margin-top: 16px;
      background: #f7f8fa;
      padding: 5px 10px;
      line-height: 30px;
      input {
        height: 20px;
      }
    }
  }
  .submit-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
