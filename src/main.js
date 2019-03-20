import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueDragResize from 'vue-drag-resize';

import store from './store';
import App from './App.vue';

library.add(faCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-drag-resize', VueDragResize);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
