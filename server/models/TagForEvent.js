const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const TagForEvent = sequelize.define('TagForEvent', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idEvent: {type: DataTypes.INTEGER, allowNull: false},
    idTag: {type: DataTypes.INTEGER, allowNull: false},
})

module.exports = TagForEvent