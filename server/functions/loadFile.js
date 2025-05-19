const {internal, badRequest} = require("../errors/ApiError");
const {join, resolve, } = require("node:path");
const fs = require('fs');

module.exports = async function(file, idEvent){
    try {
        const uploadDir = resolve(__dirname, '..', 'static');

        // Проверка mime типа
        const isImage = file.mimetype.startsWith('image');
        const isVideo = file.mimetype.startsWith('video');


        if (!isImage && !isVideo) throw badRequest('Недопустимый тип файла');

        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const fileName = Date.now() + '_' + file.name;
        const fullPath = join(uploadDir, fileName);
        await file.mv(fullPath);

        return ({nameMedia: fileName, idEvent}); // путь, по которому можно будет обращаться
    } catch (err) {
        throw internal('Ошибка при загрузке файла: ' + err.message);
    }
}