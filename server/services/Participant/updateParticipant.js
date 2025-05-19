const ApiError = require("../../errors/ApiError");
const {Participant} = require("../../models");
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const updateUser = require('../../functions/common/user/updateUser')


module.exports = async function(req){
    try{
        const {id, role} = req.user;
        const body = req.body || {};
        const logo = req.files?.logo;

        const findParticipant = await Participant.findByPk(id);
        if(!findParticipant){
            throw ApiError.badRequest('Соискатель не найден')
        }
        if(logo){
            const fileName = uuid.v4() + path.extname(logo.name);
            const filePath = path.resolve(__dirname, '../..', 'static', fileName);
            await logo.mv(filePath);
            body.logo = fileName;

            if (findParticipant.logo && findParticipant.logo !== 'defaultLogo.png') {
                const oldFilePath = path.resolve(__dirname, '../..', 'static', findParticipant.logo);
                fs.unlink(oldFilePath, (err) => {
                    if (err && err.code !== 'ENOENT') {
                        console.error('Ошибка при удалении файла:', err);
                    }
                });
            }
        }
        return await updateUser({id, role}, body)

    }catch(err){
        throw ApiError.internal(err.message)
    }
}