<template>
  <div class="repair-detail-container">
    <!-- 维修详情头部区域 -->
    <div class="repair-detail-header">
      <!-- 左侧维修状态 -->
      <div class="repair-detail-text">
        <!-- 状态为已提交 -->
        <div class="repair-detail" v-if="repairState === 1">
          <div class="state">已提交</div>
          <div class="info">请耐心等待物业处理</div>
        </div>
        <!-- 状态为已回复 -->
        <div class="repair-detail" v-if='repairState == 2'>
          <div class="state">已回复</div>
          <div class="info">“已交给相关人员处理，请耐心等待工作人员联系”</div>
        </div>
        <!-- 状态为已处理 -->
        <div class="repair-detail" v-if="repairState == 3">
          <div class="state">已处理</div>
          <div class="info">“您已确认该报修已被处理”</div>
        </div>
        <!-- 状态已取消 -->
        <div class="repair-detail" v-if="repairState == 4">
          <div class="state">已取消</div>
          <div class="info">“您已取消该报修”</div>
        </div>
      </div>
      <!-- 右侧图片 -->
      <div class="repair-detail-img">
        <div v-if='repairState == 3'>
          <img :src="repairBg2" class="bg2">
        </div>
        <div v-else>
          <img :src="repairBg1" class="bg1">
        </div>
      </div>
    </div>
    <!-- 维修详情中间的类型、详细区域 -->
    <div class="repair-detail-main">
      <div class="repair-type">
        <span>类型</span>
        <div class="type-text">
          <span>{{repairType}}</span>
          <arrow-btn color='#D2D7F0' @arrowClick='chooseType'></arrow-btn>
        </div>
      </div>
      <div class="repair-detail">
        <span>详细</span>
        <div class="detail-text">
          3栋旁边路灯坏了，晚上不亮回家不方便3栋旁边路灯坏了，晚上不亮回家不方便3栋旁边路灯坏了，晚上不亮回家不方便
          方便3栋旁边路灯坏了，晚上不亮回家不方便3栋旁边路灯坏了，晚上不亮回家不方便
        </div>
      </div>
    </div>
    <!-- 底部 处理、取消按钮 -->
    <div class="repair-detail-footer" v-if="repairState === 1 || repairState == 2">
      <!-- 维修状态为已提交或已回复, 按钮文本为已处理 -->
      <!-- 已处理按钮 将已提交或已回复的维修状态切换为已处理 -->
      <button class="btn left" @click="handledRepair">已处理</button>
      <button class="btn right" @click="cancleRepair">取消</button>
    </div>
  </div>
</template>
<script>
import { setNavigationBarTitle } from '../../api/wechat'
import arrowBtn from '@/components/arrowBtn'
export default {
  components: { arrowBtn },
  mounted () {
    setNavigationBarTitle('详情')
  },
  data () {
    return {
      repairType: '公共设施',
      repairState: 3,
      repairBg1: '../../static/images/repairBg1.png',
      repairBg2: '../../static/images/repairBg2.png'
    }
  },
  methods: {
    handledRepair () {
      console.log('确认该维修信息已被处理？')
    },
    cancleRepair () {
      // 更改已提交或已回复的维修状态
      console.log('确认取消该维修信息吗？')
    }
  }
}
</script>
<style lang="scss" scoped>
.repair-detail-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  .repair-detail-header {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 105px;
    background: rgba(160, 175, 255, 1);
    .repair-detail-text {
      display: flex;
      flex-direction: column;
      padding-left: 15px;
      margin-top: 15px;
      width: 55%;
      .repair-detail {
        margin-bottom: 10px;
        font-size: 14px;
        color: #fff;
        .state {
          margin-bottom: 8px;
        }
      }
    }
    .repair-detail-img {
      display: flex;
      margin: auto 0;
      text-align: center;
      width: 45%;
      .bg1 {
        width: 68px;
        height: 64px;
      }
      .bg2 {
        position: absolute;
        bottom: 0px;
        right: 42px;
        height: 79px;
        width: 74px;
      }
    }
  }
  .repair-detail-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 15px;
    margin-right: 15px;
    background: rgba(255, 255, 255, 1);
    border-top: 0.5px solid #eee;
    color: #333;
    font-size: 14px;
    .repair-type {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      line-height: 44px;
      border-bottom: 0.5px solid #eee;
      .type-text {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          margin-right: 16px;
          text-align: right;
          color: #666;
        }
      }
    }
    .repair-detail {
      span {
        height: 45px;
        line-height: 45px;
      }
      .detail-text {
        background: #f7f8fa;
        padding: 5px 10px;
        line-height: 30px;
      }
    }
  }
  .repair-detail-footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 45px;
    position: absolute;
    bottom: 0;
    .btn {
      border-radius: 0;
      font-size: 16px;
    }
    .btn:active {
      top: 2px;
    }
    .left {
      width: 60%;
      color: #fff;
      background: rgba(102, 125, 250, 1);
    }
    .right {
      width: 40%;
      background: rgba(255, 255, 255, 1);
      color: #667dfa;
      border: 0.5px solid rgba(102, 125, 250, 1);
    }
  }
}
</style>
