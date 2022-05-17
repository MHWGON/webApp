import { createApp } from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.scss'
import registerElemnt from '@/plugins/element-plus'

const app = createApp(App)
app.use(registerElemnt)
app.use(store).use(router).mount('#app')
