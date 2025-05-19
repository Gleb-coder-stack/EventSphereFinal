const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Event = sequelize.define('Event', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    dateStart: {type: DataTypes.DATE, allowNull: false},
    duration: {type: DataTypes.BIGINT, allowNull: false},
    dateEnd: {type: DataTypes.DATE, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: true, defaultValue: ''},
    longitude: {type: DataTypes.FLOAT, allowNull: false},
    latitude: {type: DataTypes.FLOAT, allowNull: false},
    idOrganizer: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'moderation'},
    countViews: {type: DataTypes.BIGINT, allowNull: false, defaultValue: 0},
})

module.exports = Event