<template>
  <!-- 首页报修 邀请 通知 列表组件 -->
  <div class="tab-lists">
    <!-- 左边通知文本 + 时间 -->
    <!-- 报修 -->
    <div class="tab-left" v-if='isRepair'>
      <div class="tab-up">
        <div class="tab-title">{{repairList.repairContent}}</div>
        <div class="tab-icon">{{repairList.repairType == 1 ? '公共设施' : '户外设施'}}</div>
      </div>
      <div class="time">{{repairList.createTime}}</div>
    </div>
    <!-- 邀请 -->
    <div class="tab-left" v-if='isInvite'>
      <div class="tab-up">
        <div class="tab-title">{{inviteList.personName}}</div>
      </div>
      <div class="time">{{inviteList.invalidTime}}</div>
    </div>
    <!-- 通知 -->
    <div class="tab-left" v-if='isInfo'>
      <div class="tab-up">
        <div class="tab-title">{{infoList.noticeTitle}}</div>
        <!-- <div class="tab-icon">{{infoList.repairType}}</div> -->
      </div>
      <div class="time">{{infoList.noticeTime}}</div>
    </div>
    <!-- 右边 跳转至记录详情页 -->
    <div class="tab-right">
      <div class="reply-state" v-if="isRepair">
        {{repairList.handleType == 0 ? '已提交' : (repairList.handleType == 1 ? '已回复' : (repairList.handleType == 2 ? '已处理' :'已取消'))}}
      </div>
      <div class="arrow-btn">
        <arrow-btn @arrowClick='itemClick' color='#D2D7F0' />
      </div>
    </div>
  </div>
</template>
<script>
import arrowBtn from '@/components/arrowBtn'
export default {
  components: { arrowBtn },
  props: {
    repairList: [],
    inviteList: [],
    infoList: {
      type: Array,
      default: []
    },
    isRepair: {
      type: Boolean,
      default: false
    },
    isInvite: {
      type: Boolean,
      default: false
    },
    isInfo: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
  },
  data () {
    return {
      repairList: [],
      inviteList: [],
      infoData: [],
      infoTime: ''
    }
  },
  computed: {
  },
  methods: {
    // 获取时间
    getTime () {
      this.infoData = this.infoList
      console.log(this.infoData)
    },
    // 时间格式化
    itemClick (value) {
      this.$emit('toItemDetail', value)
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
  border-bottom: 1px solid #eeeeee;
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
        color: rgba(102, 125, 250, 1);
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
      color: rgba(210, 215, 240, 1);
      font-size: 14px;
      margin-right: 10px;
    }
    .arrow-btn {
      color: rgba(210, 215, 240, 1);
    }
  }
}
</style>
