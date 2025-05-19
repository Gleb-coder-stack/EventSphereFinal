const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Feedback = sequelize.define('Feedback', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate : {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    feedbacksBody : {type: DataTypes.TEXT, allowNull: false},
    idOrganizer: {type: DataTypes.INTEGER, allowNull: false},
    idParticipant: {type: DataTypes.INTEGER, allowNull: false},
})

module.exports = Feedback