const getFilteredEvents = require('../services/Event/getAllWithFilters')
const getByIdEvent = require('../services/Event/getEventById')
const getEventsByIdOrganizer = require('../services/Event/getByIdOrganizer')
const createEvent = require('../services/Event/createEvent')
const updateEvent = require('../services/Event/updateEvent')
const deleteEvent = require('../services/Event/deletEvent')
const getModeration = require('../services/Event/getAllModeration')
const closeOrPlannedEvent = require('../services/Event/OrganizersChangeStatus')
const {applyEvent, rejectEvent} = require('../services/Event/moderatorChangeStatus')
const startEvent = require('../services/Event/startEvent')
const finishEvent = require('../services/Event/finishEvent')
const recommendEvent = require('../services/Event/getRecommendedEvents')

class EventController{
    static async getAllEvents(req, res, next) {
        try {
            const { name, selectedTagIds = [], isMap = false } = req.query;

            const parsedTags = Array.isArray(selectedTagIds)
                ? selectedTagIds.map(Number)
                : typeof selectedTagIds === 'string'
                    ? selectedTagIds.split(',').map(Number)
                    : [];

            const events = await getFilteredEvents(parsedTags, {isMap }, name);
            return res.json(events);
        } catch (err) {
            next(err);
        }
    }

    static async getEventById(req,res, next){
        try{
            const {id} = req.params;
            const result = await getByIdEvent(id);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async getMyEvents(req,res, next){
        try{
            const {name} = req.query;
            const {id: idOrganizer} = req.user;
            const result = await getEventsByIdOrganizer(idOrganizer, name);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async getRecommendedEvents(req,res, next){
        try{
            const result  = await recommendEvent(req)
            return res.json(result);
        }catch(err){
            next(err);
        }
    }


    static async createEvent(req,res, next){
        try{
            const result = await createEvent(req, req.user);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async updateEvent(req,res, next){
        const {id} = req.params;
        try{
            const result = await updateEvent(id, req, req.user);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async deleteEvent(req,res, next){
        const {id} = req.params;
        try{
            const result = await deleteEvent(id, req.user);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async getAllModeration(req,res, next){
        try{
            const result = await getModeration();
            return res.json(result);
        }catch (err){
            next(err);
        }
    }

    static async closeOrPlannedEvent(req,res, next){
        try{
            const result = await closeOrPlannedEvent(req);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async applyEventFunc(req,res, next){
        const {id} = req.params;
        try{
            const result = await applyEvent(id);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async rejectEventFunc(req,res, next){
        const {id} = req.params;
        try{
            const result = await rejectEvent(id);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async startEvent(req,res, next){
        try{
            const result = await startEvent(req);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async finishEvent(req,res, next){
        try{
            const result = await finishEvent(req);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }
}

module.exports = EventController;