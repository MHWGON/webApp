<template>
  <div class="pc-content">
    <Login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Login from './login.vue'

export default defineComponent({
  components: {
    Login
  },
  name: 'PcPageComponent',
  setup () {
    return {}
  }
})
</script>
