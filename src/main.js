import Vue from 'vue'
import router from './router'
import App from './App.vue'
import FlagIcon from 'vue-flag-icon'
import AsyncComputed from 'vue-async-computed'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false

Vue.use(require("vue-moment"));
Vue.use(FlagIcon);
Vue.use(AsyncComputed)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

