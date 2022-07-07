import { App } from 'vue'

/**
 * TOTO customPlugin
 * Vue.use(plugin)
 * 参数 {Object | Function} plugin
 * 用法：
 * 安装Vue.js插件，如果安装插件是一个对象，必须提供install方法，如果插件是一个函数，它会被作为install方法，install方法调用时，会将Vue作为参数传入
 * 该方法需要在new Vue() 之前被调用
 * 当 install方法被同一个插件多次调用，插件只会被安装一次
 */

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
