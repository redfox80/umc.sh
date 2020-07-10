import Vue from 'vue';
import VueRouter from 'vue-router';
import feathers from '../feathers';
import store from '../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: {
			allowAnonymous: true
		}
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
		meta: {
			allowAnonymous: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/auth/Login.vue'),
		meta: {
			allowAnonymous: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/auth/Register.vue'),
		meta: {
			allowAnonymous: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach( async function(to, from, next) {
	await store.dispatch('reAuthenticate');
	next();
});

router.beforeEach( async function(to, from, next) {
	const authStatus = await feathers.get('authentication');
	if( !to.meta.allowAnonymous && authStatus == null) {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		});
	}
	else {
		next();
	}

});

export default router;
