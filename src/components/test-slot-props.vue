<template>
  <div>
    <div>{{ user.name || '这是一个组件，以下为组件插槽'}}</div>
    <!-- slot绑定数据，实现引用组件时，可访问父级作用域 -->
    <slot :user="user">{{ user.say || '插槽默认值' }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>