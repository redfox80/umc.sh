// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
	const sequelizeClient = app.get('sequelizeClient');
	const link = sequelizeClient.define('link', {
		link: {
			type: DataTypes.STRING,
			allowNull: false
		},
		short: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdBy: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {
		hooks: {
			beforeCount(options) {
				options.raw = true;
			}
		}
	});

	// eslint-disable-next-line no-unused-vars
	link.associate = function (models) {
		// Define associations here
		// See http://docs.sequelizejs.com/en/latest/docs/associations/
	};

	return link;
};
