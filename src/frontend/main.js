import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from "./store";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#vue-frontend-app',
  router,
  vuetify,
  store,
  render: h => h(App)
})
