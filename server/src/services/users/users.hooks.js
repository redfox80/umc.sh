const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');
const { iff } = require('feathers-hooks-common');

const {
	hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

function checkAdmin(context) {
	if(typeof(context.params.user) != 'undefined') {
		if(context.params.user.admin) return true;
	}
	return false;
}

module.exports = {
	before: {
		all: [],
		find: [ 
			authenticate('jwt'),
			iff(checkAdmin)
				.else(
					setField({
						from: 'params.user.id',
						as: 'params.query.id'
					})
				)
		],
		get: [ 
			authenticate('jwt'),
			iff(checkAdmin)
				.else(
					setField({
						from: 'params.user.id',
						as: 'params.query.id'
					})
				)
		],
		create: [ hashPassword('password') ],
		update: [
			hashPassword('password'),
			authenticate('jwt'),
			iff(checkAdmin)
				.else(
					setField({
						from: 'params.user.id',
						as: 'params.query.id'
					})
				)
		],
		patch: [
			hashPassword('password'),
			authenticate('jwt'),
			iff(checkAdmin)
				.else(
					setField({
						from: 'params.user.id',
						as: 'params.query.id'
					})
				)
		],
		remove: [
			authenticate('jwt'),
			iff(checkAdmin)
				.else(
					setField({
						from: 'params.user.id',
						as: 'params.query.id'
					})
				)
		]
	},

	after: {
		all: [ 
			// Make sure the password field is never sent to the client
			// Always must be the last hook
			protect('password')
		],
		find: [

		],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
