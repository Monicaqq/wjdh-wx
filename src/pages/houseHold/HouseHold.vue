<template>
  <!-- 住户界面 -->
  <div class="house-hold-container">
    <nav-bar navTitle='住户信息'></nav-bar>
    <!-- 住户个人信息部分 -->
    <person-msg></person-msg>
    <!-- 删除住户按钮 -->
    <div class="submit-btn">
      <submit-btn btnText='删除' @submitClick='delHousePerson'></submit-btn>
    </div>
  </div>
</template>
<script>
import personMsg from '@/components/personMsg'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
export default {
  components: { personMsg, submitBtn, navBar },
  mounted () {
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
  flex-direction: column;
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
