import Vue from 'vue'
import App from './App.vue'

import VueRx from "vue-rx";
import VuejsClipper from "vuejs-clipper/dist/vuejs-clipper.umd";
import "vuejs-clipper/dist/vuejs-clipper.css";

Vue.use(VueRx);
Vue.use(VuejsClipper);
Vue.config.productionTip = false
Vue.use(VuejsClipper, {
  components: {
    clipperBasic: true,
    clipperPreview: true,
    clipperUpload: true,
  },
});
new Vue({
  render: h => h(App),
}).$mount('#app')
