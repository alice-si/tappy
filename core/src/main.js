import Vue from 'vue'

import Dashboard from './views/Dashboard.vue'
import Donate from './views/Donate.vue'
import NotFound from './views/NotFound.vue'
import LoadScript from 'vue-plugin-load-script';

// import VuetifyToast from 'vuetify-toast-snackbar'

import Notifications from 'vue-notification'
import AsyncComputed from 'vue-async-computed'
import Tooltip from 'vue-directive-tooltip';

import VueMdl from 'vue-mdl'

import 'vue-directive-tooltip/css/index.css';
import 'dialog-polyfill/dist/dialog-polyfill.css';


Vue.use(AsyncComputed)
Vue.use(Tooltip);
Vue.use(Notifications)
Vue.use(VueMdl)
Vue.use(LoadScript)

Vue.config.productionTip = false

const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/dashboard/': Dashboard,
  '/donate': Donate
}

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
}).$mount('#app');

Vue.loadScript("https://verify.sendwyre.com/js/widget-loader.js")
  .then(() => {
    window.widget = new Wyre.Widget({
      env: "test",
      accountId: "AC_VVUQ24V9LDP",
      auth: { type: "metamask" },
      operation: {
        type: "debitcard",
        dest: "ethereum:0x55DbDAB581c4D5318901e9e35608444Cc2A3142d",
        sourceCurrency: "USD",
        destCurrency: "DAI",
        destAmount: 10
      }
    });
    window.widget.on('complete', function(event) {
      console.log(event);
    });
  })
  .catch(() => {
    // Failed to fetch script
  });
