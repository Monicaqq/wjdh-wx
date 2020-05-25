<template>
  <div class="auth-container">
    <div class="auth">
      <button class="auth-btn" @getuserinfo='getUserInfo' open-type='getUserInfo'>授权登录</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  methods: {
    getUserInfo () {
      this.$emit('getUserInfo')
    }
  }
}
</script>
<style lang="scss" scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  // left: 0;
  // top: 0;
  width: 100%;
  height: 100%;
  background: #999;
  z-index: 999;
  .auth {
    display: flex;
    position: relative;
    width: 270px;
    height: 248px;
    background: #f5f5f5;
    border-radius: 18px;
    .auth-btn {
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      background-image: linear-gradient(90deg, #1ea3f5 0%, #0f87fc 100%);
      border-radius: 0 0 18px 18px;
      font-size: 15px;
      color: #fff;
    }
  }
}
</style>