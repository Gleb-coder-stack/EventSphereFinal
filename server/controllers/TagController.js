const {Tag} = require('../models');
const getAllFields = require('../functions/common/fields/getAllFields')
const createTag = require('../services/Tag/addTag')
const updateTag = require('../services/Tag/updateTag')
const deleteTag = require('../functions/common/fields/deleteData')

const nameModel = Tag

class TagController {
    static async getAllTags(req, res, next) {
        try{
            const result = await getAllFields(nameModel)
            return res.json(result)
        }catch(err){
            return next(err);
        }
    }
    static async createTag(req, res, next) {
        try{
            const result  = await createTag(req.body)
            return res.json(result)
        }catch(err){
            return next(err);
        }
    }
    static async updateTag(req, res, next) {
        const {id} = req.params
        try{
            const result = await updateTag(id, req.body)
            return res.json(result)
        }catch(err){
            return next(err);
        }
    }
    static async deleteTag(req, res, next) {
        const {id} = req.params
        try{
            const result = await deleteTag(id, nameModel)
            return res.json(result)
        }catch (err){
            return next(err);
        }
    }
}

module.exports = TagController