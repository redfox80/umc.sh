'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable('link', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			link: {
				type: Sequelize.STRING,
				allowNull: false
			},
			short: {
				type: Sequelize.STRING,
				allowNull: false
			},
			createdBy: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},

	//eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		queryInterface.dropTable('link');
	}
};
