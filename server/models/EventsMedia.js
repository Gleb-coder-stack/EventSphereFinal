const sequelize = require('../db')
const {DataTypes} = require('sequelize')

 const EventsMedia = sequelize.define('EventsMedia', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idEvent: {type: DataTypes.INTEGER, allowNull: false},
    nameMedia: {type: DataTypes.STRING, allowNull: false},
})

module.exports = EventsMedia