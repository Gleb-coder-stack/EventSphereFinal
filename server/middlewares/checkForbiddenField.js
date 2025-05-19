
module.exports =  function() {
    return async (req, res, next) => {
        try{
            if(req.body.status){
                return res.status(400).json({message: 'Для обновления переданы запрещенные поля'})
            }
            next()
        }catch(err){
            return res.status(500).json({message:"Ошибка сервера"})
        }

    }
}