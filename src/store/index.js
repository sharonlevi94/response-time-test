import Vue from 'vue'
import Vuex from 'vuex'
import results from './response-times'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules:{
    results
  }
})
