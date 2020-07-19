'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([

				queryInterface.addColumn('link', 'clicks', {
					type: Sequelize.DataTypes.INTEGER,
					defaultValue: 0
				}, { transaction: t})

			]);
		});
	},

	down: async (queryInterface) => {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([

				queryInterface.removeColumn('link', 'clicks', { transaction: t })

			]);
		});
	}
};
