import { App } from 'vue'

export default function (app: App, options: Record<string, any>) {
  // v-track
  app.directive('track', {
    mounted (el, binding) {
      el.value = binding.value
      el.addEventListener('click', () => {
        console.log('track click', el.value)
      }, false)
    },
    updated (el, binding) {
      el.value = binding.value
    }
  })

  app.config.globalProperties.$customPlugin = 'customPlugin'
  app.provide('customOptions', options) // 将plugin传入的options传递出去
}
