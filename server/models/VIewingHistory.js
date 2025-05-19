const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const ViewingHistory = sequelize.define('ViewingHistory', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    idParticipant: {type: DataTypes.INTEGER, allowNull: false},
    idEvent: {type: DataTypes.INTEGER, allowNull: false}
})

module.exports = ViewingHistory