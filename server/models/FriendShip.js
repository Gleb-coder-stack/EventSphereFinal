const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const FriendShip = sequelize.define('FriendShip', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idRequester : {type: DataTypes.INTEGER, allowNull: false}, //Кто отправил
    idReceiver : {type: DataTypes.INTEGER, allowNull: false}, //Кому отправили
    status : {type: DataTypes.STRING, allowNull: false, defaultValue: 'pending'}, //pending - ожидание ответа получателя, friends - одобрено и стали друзьями, rejected - отклонено
})

module.exports = FriendShip