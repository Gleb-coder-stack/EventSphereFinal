const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const NotificationOfEvent = sequelize.define('NotificationOfEvent', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idParticipant: {type: DataTypes.INTEGER, allowNull: false},
    idEvent: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'sent'},
})

module.exports = NotificationOfEvent