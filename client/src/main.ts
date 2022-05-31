import { createApp } from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.scss'
import registerElement from '@/plugins/element-plus'
import targetPlugin from '@/plugins/targetPlugin'
import customPlugin from '@/plugins/customPlugin'

const app = createApp(App)
app.use(registerElement)
app.use(targetPlugin)
app.use(customPlugin)
app.use(store).use(router).mount('#app')
