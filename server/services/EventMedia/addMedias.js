const checkEvent = require("../../functions/common/fields/checkRecord");
const { Event, EventsMedia } = require("../../models");
const ApiError = require("../../errors/ApiError");
const loadFile = require("../../functions/loadFile");

module.exports = async function (idEvent, files) {
    console.log(files)
    if (!files || (Array.isArray(files) && files.length === 0)) {
        throw ApiError.badRequest("Файлы не переданы");
    }

    try {
        const checkResult = await checkEvent(idEvent, Event);
        if (!checkResult) {
            throw ApiError.badRequest("Событие не найдено");
        }

        const fileArray = [];

        if (Array.isArray(files)) {
            for (const item of files) {
                if (Array.isArray(item?.files)) {
                    fileArray.push(...item.files);
                } else {
                    fileArray.push(item);
                }
            }
        } else if (Array.isArray(files?.files)) {
            fileArray.push(...files.files);
        } else {
            fileArray.push(files);
        }

        let addResult = [];
        for (const file of fileArray) {

            const resultUpload = await loadFile(file, idEvent);
            addResult.push(resultUpload);
        }

        if (addResult.length > 0) {
            await EventsMedia.bulkCreate(addResult);
        }

        return ({ message: 'Файлы успешно загружены' });
    } catch (err) {
        throw ApiError.internal(err.message);
    }
}
