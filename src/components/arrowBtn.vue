<template>
  <div class="arrow-btn" :style="{color: color}" @click="arrowClick">
    <van-icon name="arrow" />
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    arrowClick (value) {
      this.$emit('arrowClick', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.arrow-btn {
  right: 15px;
  bottom: 52.5px;
  margin: 0 auto;
  height: 14px;
  line-height: 14px;
}
</style>
