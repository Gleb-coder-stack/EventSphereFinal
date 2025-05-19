const {badRequest, internal} = require("../../errors/ApiError");
const {Tag} = require("../../models");
module.exports = async function (tagIds = []) {
    if (!Array.isArray(tagIds)) {
        throw badRequest("Теги должны быть переданы в виде массива");
    }
    if (tagIds.length === 0) return true;

    try {
        const parsedIds = tagIds.map(id => Number(id));
        const foundTags = await Tag.findAll({
            where: {
                id: parsedIds
            },
            attributes: ['id']
        });

        const foundIds = foundTags.map(tag => tag.id);
        const missing = parsedIds.filter(id => !foundIds.includes(id));

        if (missing.length > 0) {
            throw badRequest(`Теги с ID: [${missing.join(', ')}] не найдены`);
        }

        return true;
    } catch (err) {
        throw internal(err.message);
    }
}