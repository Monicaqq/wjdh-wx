<template>
  <!-- 住户界面 -->
  <div class="house-hold-container">
    <!-- 住户个人信息部分 -->
    <person-msg></person-msg>
    <!-- 删除住户按钮 -->
    <div class="submit-btn">
      <submit-btn btnText='删除' @submitClick='delHousePerson'></submit-btn>
    </div>
  </div>
</template>
<script>
import { setNavigationBarTitle } from '../../api/wechat'
import personMsg from '@/components/personMsg'
import submitBtn from '@/components/submitBtn'
export default {
  components: { personMsg, submitBtn },
  mounted () {
    setNavigationBarTitle('住户信息')
  },
  methods: {
    delHousePerson () {
      console.log('删除住户')
    }
  }
}
</script>
<style lang="scss" scoped>
.house-hold-container {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  .submit-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
