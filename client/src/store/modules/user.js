import feathers from '../../feathers';
import Vue from 'vue';

export default {
	state: {
		users: []
	},
	actions: {
		async getUsers( {state}) {
			feathers.service('users').find()
				.then(r => {
					Vue.set(state, 'users', r.data);
				})
				.catch(err => console.log(err));
		}
	}
};