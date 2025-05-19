const ApiError = require("../errors/ApiError");

module.exports = function(dateStart, dateEnd) {
    const startTimestamp = Date.parse(dateStart);
    const endTimestamp = Date.parse(dateEnd);

    if (isNaN(startTimestamp)) {
        throw ApiError.badRequest("Некорректная начальная дата");
    }
    if (isNaN(endTimestamp)) {
        throw ApiError.badRequest("Некорректная конечная дата");
    }
    if (endTimestamp < startTimestamp) {
        throw ApiError.badRequest("Конечная дата не может быть раньше начальной");
    }

    return endTimestamp - startTimestamp; // возвращает миллисекунды
};
