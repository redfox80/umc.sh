'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('users');
	}
};
