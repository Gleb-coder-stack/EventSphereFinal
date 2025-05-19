const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Participant = sequelize.define('Participant', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    nickname: {type: DataTypes.STRING, allowNull: false, unique: true},
    logo: {type: DataTypes.STRING, allowNull: true, defaultValue: 'defaultLogo.png'},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: true}, //Адрес для подбора мероприятий
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'participant'},
    isConfidential: {type: DataTypes.BOOLEAN, defaultValue: false},
    versionJwt: {type: DataTypes.STRING, allowNull: true},
    isCelebrity: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

module.exports = Participant