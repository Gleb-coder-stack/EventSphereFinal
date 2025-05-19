const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Tag = sequelize.define('Tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    isSystem: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

module.exports = Tag