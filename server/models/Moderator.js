const sequelize = require('../db')
const {DataTypes} = require('sequelize')

 const Moderator = sequelize.define('Moderator', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'moderator'},
    versionJwt: {type: DataTypes.STRING, allowNull: true},
})

module.exports = Moderator