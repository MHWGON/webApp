<template>
  <div id="nav" class="home-container">
    <pc-page class="pc-page-wrapper"></pc-page>
    <mobile-page class="mobile-page-wrapper"></mobile-page>
  </div>
  <router-view />
</template>

<script>
import pcPage from '@/components/pcPageComponents'
import mobilePage from '@/components/mobilePageComponents'
import { defineComponent, onMounted } from 'vue'
import { requestValidateUser, requestUserProfile } from '@/services/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

export default defineComponent({
  name: 'Home',
  components: {
    'pc-page': pcPage,
    'mobile-page': mobilePage
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setup () {
    onMounted(async () => {
      const { data } = await requestValidateUser()
      if (data.code === 0) {
        ElMessage({
          type: 'success',
          showClose: false,
          message: data.mes,
          center: true
        })
        router.push('/index')
        requestUserProfile()
      }
    })
  }
})
</script>

<style lang="scss">
.pc-page-wrapper {
  height: 100%;
}
.mobile-page-wrapper {
  height: 100%;
}
.home-container {
  width: 100%;
  height: 100%;
  .mobile-page-wrapper {
    display: none;
  }
  @media (max-width: 576px) {
    .pc-page-wrapper {
      display: none;
    }
    .mobile-page-wrapper {
      display: block;
    }
  }
}
</style>
