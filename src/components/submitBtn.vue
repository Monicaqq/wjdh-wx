<template>
  <div class="submit-btn">
    <button :class="['btn',active ? 'active' : 'unactive']" @click="submit">{{btnText}}</button>
  </div>
</template>
<script>
export default {
  props: {
    btnText: '',
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
<style lang="scss" scoped>
.submit-btn {
  display: flex;
  align-items: center;
  height: 83px;
  margin-left: 37.5px;
  margin-right: 37.5px;
  .btn {
    width: 100%;
    height: 45px;
    border-radius: 22.5px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    line-height: 45px;
  }
  .active {
    background: rgba(102, 125, 250, 1);
  }
  .unactive {
    color: rgba(102, 125, 250, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(102, 125, 250, 1);
  }
}
</style>