import Vue from 'vue';
import App from './App.vue';
import router from '../router/index.js';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
