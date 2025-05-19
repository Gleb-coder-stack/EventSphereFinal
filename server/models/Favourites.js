const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Favourites = sequelize.define('Favourites', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idParticipant: {type: DataTypes.INTEGER, allowNull: false},
    idEvent: {type: DataTypes.INTEGER, allowNull: false},
})

module.exports = Favourites

