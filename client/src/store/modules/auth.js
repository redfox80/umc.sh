import feathers from '../../feathers';
import Vue from 'vue';

export default {
	state: {
		status: false,
		user: {}
	},
	actions: {
		async login( {state}, input ) {
			const data = {
				strategy: 'local',
				username: input.username,
				password: input.password
			};

			let res = feathers.authenticate(data);

			res
				.then((r) => {
					console.log(r.user);
					Vue.set(state, 'user', r.user);
					Vue.set(state, 'status', true);
				})
				.catch(err => err);

			return res;
		},
		logout( {state} ) {
			feathers.logout()
				.then(() => {
					Vue.set(state, 'status', false);
					Vue.set(state, 'user', {});
				})
				.catch(err => err);
		},
		async register( {state}, input) {

			let res = feathers.service('users').create(input);

			res
				.then(() => {
					// console.log('Store', r);

					const data = {
						strategy: 'local',
						username: input.username,
						password: input.password
					};
					
					feathers.authenticate(data)
						.then((r) => {
							Vue.set(state, 'user', r.user);
							Vue.set(state, 'status', true);
						})
						.catch(err => console.log(err));
					// Vue.set(state, 'status', true);
				})
				.catch(err => err);

			return res;

		},
		async reAuthenticate( {state} ) {

			if(state.status === false) {

				await feathers.reAuthenticate()
					.then((r) => {
						Vue.set(state, 'user', r.user);
						Vue.set(state, 'status', true);
					})
					.catch(err => {
						//This looks wierd but it's here to hide the error message from the console as it's not really and error, it just means that you are not authenticated
						err;
					});

			}
		},
		async updatePassword( _, data) {
			const input = {
				password: data.password
			};

			let res = feathers.service('users').patch(data.id, input);

			res.then(r => console.log(r))
				.catch(err => console.log(err));

			return res;
		}
	}
};