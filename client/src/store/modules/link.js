import feathers from '../../feathers';
import store from '../index';
import Vue from 'vue';

export default {
	state: {
		linkRes: null,
		links: [],
		linksAdmin: []
	},
	actions: {
		async postLink(_, input ) {
		
			const res = await feathers.service('link').create(input);
			return res;
		},
		async getLinks( {state} ) {
			const user = store.state.auth.user;
			feathers.service('link').find({ query: {createdBy: user.id} })
				.then(r => {
					Vue.set(state, 'links', r.data);
				})
				.catch(err => console.log(err));
		},
		async getLinksAdmin( {state} ) {
			feathers.service('link').find()
				.then( r => {
					Vue.set(state, 'linksAdmin', r.data);
				})
				.catch(err => console.log(err));
		},
		async removeLink( _, id) {
			feathers.service('link').remove(id)
				.then(() => {
					this.dispatch('getLinks');
				});
		}
	}
};