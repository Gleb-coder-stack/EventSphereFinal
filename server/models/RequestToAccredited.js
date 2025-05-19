const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const RequestToAccredited = sequelize.define('RequestToAccredited', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idOrganizer: {type: DataTypes.INTEGER, allowNull: false},
    links: {type: DataTypes.STRING, allowNull: true},
    filename: {type: DataTypes.STRING, allowNull: true},
    status: {type: DataTypes.ENUM("pending", "approved", "rejected"), defaultValue: "pending" },
})

module.exports = RequestToAccredited