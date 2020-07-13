const { authenticate } = require('@feathersjs/authentication').hooks;
// const { disallow, iff } = require('feathers-hooks-common');
const { setField } = require('feathers-authentication-hooks');
const Crypto = require('crypto');

function genShortHand(context) {
	context.data['short'] = Crypto.randomBytes(3).toString('hex').substr(1);
	if(typeof context.params.user !== 'undefined') {
		context.data['createdBy'] = context.params.user.id;
	}
}

module.exports = {
	before: {
		all: [],
		find: [
			authenticate('jwt'),
			setField({
				from: 'params.user.id',
				as: 'params.query.createdBy'
			})
		],
		get: [],
		create: [ genShortHand ],
		update: [
			authenticate('jwt'),
			setField({
				from: 'params.user.id',
				as: 'params.query.createdBy'
			})
		],
		patch: [
			authenticate('jwt'),
			setField({
				from: 'params.user.id',
				as: 'params.query.createdBy'
			})
		],
		remove: [
			authenticate('jwt'),
			setField({
				from: 'params.user.id',
				as: 'params.query.createdBy'
			})
		]
	},

	after: {
		all: [],
		find: [],
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
