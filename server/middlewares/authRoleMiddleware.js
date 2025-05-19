const jwt = require('jsonwebtoken')
const roleModelMap = require('../const/roles')

module.exports = function(roles=[]){
    return async (req, res, next) => {
        if (req.method === "OPTIONS") {
            return next()
        }

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: "Не авторизован" });
            }
            const token = req.headers.authorization.split(' ')[1] //Bearer asdfyfgayusgasydggdasgdauydgasdgag.udhasuhdasdhasudhasudhaudauidhasiud.aishdasiouhdiuashdgi

            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            const modelName = roleModelMap[decoded.role];

            if (!roles.includes(decoded.role) || !modelName) {
                return res.status(403).json({message: 'Нет доступа'});
            }
            if(!decoded.versionJwt) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const user = await modelName.findOne({ where: { id: decoded.id, versionJwt: decoded.versionJwt } });
            if (!user) {
                return res.status(401).json({ message: 'Сессия устарела или пользователь не найден' });
            }
            req.user = decoded
            next()
        } catch (e) {
            return res.status(401).json({message: "Ошибка при проверке авторизации"})
            next(e)
        }}
};