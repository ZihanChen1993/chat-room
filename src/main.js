import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import MuseUI from 'muse-ui';
import Message from 'muse-ui-message';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import store from './store/index';
import moment from 'moment'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(MuseUI);
Vue.use(Message);

Vue.filter('dateFormat', function (dateStr,pattern = "MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
})
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
