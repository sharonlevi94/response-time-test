import Vue from 'vue'
import App from './App.vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import store from './store'

Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
