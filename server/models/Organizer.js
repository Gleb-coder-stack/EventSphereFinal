const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Organizer = sequelize.define('Organizer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : {type: DataTypes.STRING, allowNull: false},
    logo : {type: DataTypes.STRING, allowNull: true, defaultValue: 'defaultLogo.png'},
    email : {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role : {type: DataTypes.STRING, allowNull: false, defaultValue: 'organizer'},
    isAccredited : {type: DataTypes.BOOLEAN, defaultValue: false},
    versionJwt: {type: DataTypes.STRING, allowNull: true},
    countViews: {type: DataTypes.BIGINT, allowNull: false, defaultValue: 0},
    isHiddenFeedbacks: {type: DataTypes.BOOLEAN, defaultValue: false},
    canCreateFeedbacks: {type: DataTypes.BOOLEAN, defaultValue: true},
})

module.exports = Organizer