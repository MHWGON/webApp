import { App } from 'vue'

export default {
  install (app: App, options: Record<string, any>) {
    // app.directive('track', {
    //   mounted (el, binding) {
    //     el.value = binding.value
    //     el.addEventListener('click', () => {
    //       console.log('track click')
    //     }, false)
    //   },
    //   updated (el, binding) {
    //     el.value = binding.value
    //   }
    // })
    app.mixin({
      created () {
        console.log('mixin create')
      }
    })
    app.config.globalProperties.$filters = {
      sexFilter (value: number | string) {
        if (value === 1) return 'boy'
        else return 'girl'
      }
    }
    app.config.globalProperties.$targetPlugin = 'targetPlugin'
    app.provide('targetOptions', options) // 将plugin传入的options传递出去
  }
}
