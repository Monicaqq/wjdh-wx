<template>
  <div class="repair-apply-container">
    <div class="apply-type">
      <span>类型</span>
      <div class="repair-type">
        <input type="text" v-model="repairType">
        <!-- <span>公共设施</span> -->
        <arrow-btn color='#D2D7F0' @arrowClick='chooseType'></arrow-btn>
      </div>
      <!-- <div class="arrow-btn">
        <arrow-btn color='#D2D7F0' @arrowClick='chooseType'></arrow-btn>
      </div> -->
    </div>
    <div class="apply-detail">
      <span>详细</span>
      <div class="detail-text">
        <input type="text" v-model="repairDetail" placeholder="请输入报修详细信息" maxlength="200">
      </div>
    </div>
    <div class="submit-btn">
      <submit-btn btnText='提交' @submit='applyRepair' isActive></submit-btn>
    </div>
  </div>
</template>
<script>
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
import { setNavigationBarTitle } from '../../api/wechat'
export default {
  components: { arrowBtn, submitBtn },
  mounted () {
    setNavigationBarTitle('报修')
  },
  data () {
    return {
      repairType: '公共设施',
      repairDetail: ''
    }
  },
  methods: {
    chooseType () {
      console.log('选择报修类型')
    },
    applyRepair () {
      console.log('提交报修')
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
  margin-left: 15px;
  margin-right: 15px;
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
    margin: 15px 0;
    .detail-text {
      height: 100px;
      margin-top: 16px;
      background: #f7f8fa;
      padding: 5px 10px;
      line-height: 30px;
    }
  }
  .submit-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
