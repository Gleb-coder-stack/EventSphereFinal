const ApiError = require("../../errors/ApiError");
const { Organizer} = require("../../models");
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const updateUser = require('../../functions/common/user/updateUser')


module.exports = async function(req){
    try{
        const {id, role} = req.user;
        const body = req.body || {};
        const logo = req.files?.logo;

        const findOrganizer = await Organizer.findByPk(id);
        if(!findOrganizer){
            throw ApiError.badRequest('орагнизатор не найден')
        }
        if(logo){
            const fileName = uuid.v4() + path.extname(logo.name);
            const filePath = path.resolve(__dirname, '../..', 'static', fileName);
            await logo.mv(filePath);
            body.logo = fileName;

            if (findOrganizer.logo && findOrganizer.logo !== 'defaultLogo.png') {
                const oldFilePath = path.resolve(__dirname, '../..', 'static', findOrganizer.logo);
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