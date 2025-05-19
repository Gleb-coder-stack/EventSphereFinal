const FavoriteServices = require ('../services/Favorites/FavoriteServices');

class FavouriteController {
    static async getMy(req, res, next){
        try{
            const result = await FavoriteServices.getMyFavourites(req);
            return res.json(result);
        }catch(err){
            next(err)
        }
    }

    static async addFavourite(req, res, next){
        try{
            const result = await FavoriteServices.addFavourite(req);
            return res.json(result);
        }catch(err){
            next(err)
        }
    }

    static async deleteFavouriteById(req, res, next){
        try{
            const result = await FavoriteServices.deleteFavouriteById(req);
            return res.json(result);
        }catch(err){
            next(err)
        }
    }

    static async clearMyFavourite(req, res, next){
        try{
            const result = await FavoriteServices.clearMyFavourites(req)
            return res.json(result);
        }catch(err){
            next(err)
        }
    }
}

module.exports = FavouriteController;