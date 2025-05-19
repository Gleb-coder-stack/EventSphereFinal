require('dotenv').config()
require('./functions/crons/finishEvents')
require('./functions/crons/startEvents')
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const createAdmin = require('./functions/createFirstAdmin')
const errorHandler = require('./middlewares/errorHandingMiddleware')
const router = require('./routes/index')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await createAdmin()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()




