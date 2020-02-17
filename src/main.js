import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import requers from './utils/custom-request'
import 'intersection-observer'

Vue.config.productionTip = false;

Vue.use(requers);

Vue.filter('test-filter', function(name) {
  return name + '？没听说过~'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
