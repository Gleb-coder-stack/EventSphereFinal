const { Sequelize, Op } = require('sequelize');
const { TagForEvent, Tag, EventsMedia, Event, Organizer } = require('../../models');
const ApiError = require('../../errors/ApiError');

module.exports = async function (selectedTagIdsRaw, options = {}, name) {
    try {
        const { isMap = false } = options;
        let selectedTagIds = [];

        // Обработка входных тегов
        if (typeof selectedTagIdsRaw === 'string') {
            selectedTagIds = selectedTagIdsRaw.split(',').map(Number).filter(Boolean);
        } else if (Array.isArray(selectedTagIdsRaw)) {
            selectedTagIds = selectedTagIdsRaw.map(Number).filter(Boolean);
        }

        console.log('selectedTagIds:', selectedTagIds); // Дебаг

        let idEvent = null;

        // Если выбраны теги, ищем события, у которых есть все указанные теги
        if (selectedTagIds.length > 0) {
            const tagEvents = await TagForEvent.findAll({
                attributes: ['idEvent'],
                where: {
                    idTag: { [Op.in]: selectedTagIds },
                },
                group: ['idEvent'],
                having: Sequelize.literal(`COUNT(DISTINCT "idTag") = ${selectedTagIds.length}`),
            });

            idEvent = tagEvents.map((te) => te.idEvent);
            console.log('idEvent:', idEvent); // Дебаг
            if (idEvent.length === 0) return []; // Нет совпадений
        }

        const queryOptions = {
            where: {
                status: ['active', 'planned'],
            },
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id', 'Name'],
                    through: { model: TagForEvent },
                    required: false, // Делаем LEFT JOIN для тегов
                },
                {
                    model: EventsMedia,
                    as: 'medias',
                    limit: 1,
                    separate: true,
                    order: [['createdAt', 'ASC']],
                    required: false,
                },
                {
                    model: Organizer,
                    as: 'organizer',
                    attributes: ['id', 'name'],
                    required: false, // Делаем LEFT JOIN для организатора
                },
            ],
        };

        if (name) {
            queryOptions.where.name = { [Op.iLike]: `%${name}%` };
        }

        if (idEvent && idEvent.length > 0) {
            queryOptions.where.id = { [Op.in]: idEvent };
        }

        const events = await Event.findAll(queryOptions);
        console.log('events:', events); // Дебаг
        return events;
    } catch (err) {
        throw ApiError.internal(err.message);
    }
};