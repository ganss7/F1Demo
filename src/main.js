import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { MdApp, MdToolbar, MdContent, MdList, MdDialog, MdButton, MdProgress } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import './styles/f1-theme.scss'

Vue.config.productionTip = false
Vue.use(MdApp)
Vue.use(MdToolbar)
Vue.use(MdContent)
Vue.use(MdList)
Vue.use(MdDialog)
Vue.use(MdButton)
Vue.use(MdProgress)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
