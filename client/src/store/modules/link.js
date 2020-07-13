import feathers from '../../feathers';
import Vue from 'vue';

export default {
	state: {
		linkRes: null,
		links: []
	},
	actions: {
		async postLink(_, input ) {
		
			const res = await feathers.service('link').create(input);
			return res;
		},
		async getLinks( {state} ) {
			feathers.service('link').find()
				.then(r => {
					Vue.set(state, 'links', r.data);
				})
				.catch(err => console.log(err));
		},
		async removeLink( _, id) {
			feathers.service('link').remove(id)
				.then(r => console.log(r));
		}
	}
};