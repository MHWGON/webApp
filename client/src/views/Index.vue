<template>
  <div class="about">
    <h1 v-track="`welcome`">Welcome to You</h1>
    <div>{{ $filters.sexFilter(1) }}</div>
  </div>
</template>

<script lang="ts">
import { App, defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'Index',
  setup () {
    const instance = getCurrentInstance()
    console.log('app', instance!.appContext.config.globalProperties) // 获取到plugin上面定义的全局的属性
  }
})
</script>
