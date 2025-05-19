const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const InviteToEvent = sequelize.define('InviteToEvent', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idRequester : {type: DataTypes.INTEGER, allowNull: false}, //Кто отправил
    idReceiver : {type: DataTypes.INTEGER, allowNull: false}, //Кому отправили
    idEvent : {type: DataTypes.INTEGER, allowNull: false},
    status : {type: DataTypes.STRING, allowNull: false, defaultValue: 'pending'},
})

module.exports = InviteToEvent