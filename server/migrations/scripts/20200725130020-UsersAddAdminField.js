'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addColumn('users', 'admin', {
			type: Sequelize.DataTypes.BOOLEAN,
			defaultValue: false
		});
	},

	down: async (queryInterface) => {
		queryInterface.removeColumn('users', 'admin');
	}
};
