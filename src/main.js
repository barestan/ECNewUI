import Vue from 'vue'
import router from './router'
import App from './App.vue'
import FlagIcon from 'vue-flag-icon'
import AsyncComputed from 'vue-async-computed'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueHighlightJS from 'vue-highlight.js';
import 'vue-highlight.js/lib/allLanguages'
import 'highlight.js/styles/default.css';

Vue.config.productionTip = false

Vue.use(require("vue-moment"));
Vue.use(FlagIcon);
Vue.use(AsyncComputed)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueHighlightJS);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

