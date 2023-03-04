require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const { Device, DeviceInfo, Brand, Type } = require('./models/models')
const router = require('./routes/index')
const cors = require('cors')
const fileupload = require('express-fileupload')
const path = require('path')
const ApiError = require('./error/ApiEror')
const errorHandler = require('./middleware/ErorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)

app.use(errorHandler)


const start = async () => {
   try {
      await sequelize.authenticate()
      await sequelize.sync()
      app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
   } catch (error) {
      console.log(error)
   }
}

start()