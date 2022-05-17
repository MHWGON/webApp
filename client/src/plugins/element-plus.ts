import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage } from 'element-plus'

const components = [
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElMessage
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
