const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const RecallToEvent = sequelize.define('RecallToEvent', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idEvent: {type: DataTypes.INTEGER, allowNull: false},
    idParticipant: {type: DataTypes.INTEGER, allowNull: false},
})

module.exports = RecallToEvent