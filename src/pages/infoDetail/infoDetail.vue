<template>
  <!-- 通知详情界面 -->
  <div class="info-detail-container">
    <nav-bar navTitle='详细'></nav-bar>
    <!-- 通知详情标题 -->
    <div class="info-title">
      <span>标题</span>
      <div class="title-text">
        物业费收取通知3栋旁边路灯坏了
      </div>
    </div>
    <!-- 通知详情内容 -->
    <div class="info-content">
      <span>内容</span>
      <div class="content-text">
        3栋旁边路灯坏了，晚上不亮回家不方便3栋旁边路灯坏了，晚上不亮回家不方便3栋旁边路灯坏了，晚上不亮回家不方便
        方便3栋旁边路灯坏了，晚上不亮回家不方便3栋旁边路灯坏了，晚上不亮回家不方便
      </div>
    </div>
  </div>
</template>
<script>
import navBar from '@/components/navBar'
export default {
  components: { navBar }
}
</script>
<style lang="scss" scoped>
.info-detail-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #eeeeee;
  color: #333;
  font-size: 14px;
  .info-title {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 17px;
    .title-text {
      margin-top: 10px;
      padding: 5px 10px;
      background: rgba(247, 248, 250, 1);
      line-height: 30px;
    }
  }
  .info-content {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 13px;
    margin-bottom: 17px;
    height: 100%;
    .content-text {
      margin-top: 13.5px;
      background: rgba(247, 248, 250, 1);
      padding: 5px 10px;
      line-height: 30px;
    }
  }
}
</style>
