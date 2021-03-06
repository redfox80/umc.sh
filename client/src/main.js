import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app');

let dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

if(process.env.NODE_ENV == 'production') {
	gtag('js', new Date());
	gtag('config', 'UA-173033541-1');
}