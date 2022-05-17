<template>
  <div class="page-container">
    <div class="lottery-container">
      <img :src="dotImage" class="dotStop" />
      <img
        :src="rewardImage"
        class="reward"
        :style="{ transform: `rotate(${rotateDeg}deg)` }"
      />
      <img :src="pointerImage" class="pointer" />
      <ElButton @click.stop="startRotation">start</ElButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import dotImage from '@/assets/images/dot.png'
import pointerImage from '@/assets/images/pointer.png'
import rewardImage from '@/assets/images/reward.png'

export default defineComponent({
  name: 'Lottery',
  setup () {
    const times = ref(10)
    const isRotation = ref(false)
    const lastDeg = ref(0)
    const rotateDeg = ref(0)

    const startRotation = () => {
      // if (!isRotation.value) isRotation.value = true
      let timer
      if (times.value > 1 && !isRotation.value) {
        isRotation.value = true
        rotateDeg.value += getRandom(2, 3) * 360 + 45 + lastDeg.value
        timer = setTimeout(() => {
          times.value--
          isRotation.value = false
          clearTimeout(timer)
        }, 4000)
      }
      // console.log('rotateDeg.value', rotateDeg.value)
    }
    // 获取最大最小数之间的随机数
    const getRandom = (min, max) => {
      return Math.floor(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return {
      lastDeg,
      rotateDeg,
      isRotation,
      dotImage,
      pointerImage,
      rewardImage,
      startRotation
    }
  }
})
</script>

<style lang="scss">
.page-container {
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  .lottery-container {
    margin-top: 20px;
    position: relative;
    width: 188px;
    height: 188px;
    border-radius: 50%;
    .dotStart {
      width: 100%;
      animation: rotateAnim 5s linear reverse infinite;
      /* let the browser know we plan to animate each view in and out */
      will-change: transform;
    }
    .dotStop {
      width: 100%;
    }
    .reward {
      width: 178px;
      margin-left: 5px;
      position: relative;
      z-index: 1;
      top: -187px;
      transition: all 4s;
    }
    .pointer {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
  }
}
@keyframes rotateAnim {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
