<template>
  <!-- 首页报修 邀请 通知 列表组件 -->
  <div class="tab-lists">
    <!-- 左边通知文本 + 时间 -->
    <div class="tab-left">
      <div class="tab-up">
        <div class="tab-title">{{data.infoMsg}}</div>
        <div class="tab-icon" v-if='isRepair'>{{data.repairType}}</div>
      </div>
      <div class="time">{{data.time}}</div>
    </div>
    <!-- 右边 跳转至记录详情页 -->
    <div class="tab-right">
      <div class="reply-state" v-if="isRepair">{{data.replyState}}</div>
      <div class="arrow-btn">
        <arrow-btn @arrowClick='toDetailVue' />
      </div>
    </div>
  </div>
</template>
<script>
import arrowBtn from '@/components/arrowBtn'
export default {
  components: { arrowBtn },
  props: {
    data: [],
    // title: {
    //   type: String,
    //   default: ''
    // },
    // time: {
    //   type: String,
    //   default: ''
    // },
    isRepair: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toDetailVue () {
      console.log('跳转至详情页')
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-lists {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 59.5px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid #EEEEEE;
  .tab-left {
    display: flex;
    flex-direction: column;
    .tab-up {
      display: flex;
      align-items: center;
      .tab-title {
        max-width: 186px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 6px;
      }
      .tab-icon {
        width: 50px;
        height: 15px;
        border: 1px solid rgba(102, 125, 250, 1);
        border-radius: 5px;
        font-size: 11px;
        text-align: center;
        line-height: 15px;
        color:rgba(102,125,250,1);
      }
    }
    .time {
      font-size: 12px;
      margin-top: 8px;
    }
  }
  .tab-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    right: 0;
    .reply-state {
      color:rgba(210,215,240,1);
      font-size: 14px;
      margin-right: 10px;
    }
    .arrow-btn {
      color:rgba(210,215,240,1);
    }
  }
}
</style>
