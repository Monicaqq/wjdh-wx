<template>
  <!-- 头像组件 -->
  <div class="avator-img">
    <img :src="src" mode :class="round ? 'round image' : 'image'">
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'aspectFit'
    },
    round: {
      type: Boolean,
      default: true
    }
  }

}
</script>
<style lang="scss" scoped>
.avator-img {
  width: 47px;
  height: 47px;
  .image {
    width: 100%;
    height: 100%;
  }
  .round {
    border-radius: 50%;
  }
}
</style>