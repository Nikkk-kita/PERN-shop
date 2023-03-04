const uuid = require('uuid')
const path = require('path')
const { unlink } = require('fs/promises')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiEror')

class DeviceController {
   async create(req, res, next) {
      try {
         let { name, price, brandId, typeId, info } = req.body
         const { img } = req.files
         let fileName = uuid.v4() + '.jpg'
         img.mv(path.resolve(__dirname, '..', 'static', fileName))

         const device = await Device.create({ name, price, brandId, typeId, img: fileName })

         if (info) {
            info = JSON.parse(info)
            info.forEach(i => DeviceInfo.create({
               title: i.title,
               description: i.description,
               deviceId: device.id
            }))
         }
         return res.json(device)
      } catch (error) {
         next(ApiError.badRequest(error.message))
      }

   }

   async getAll(req, res) {
      const { brandId, typeId, limit, page } = req.query
      let Page = page || 1
      let Limit = limit || 9
      let offset = Page * Limit - Limit
      let devices
      if (!brandId && !typeId) {
         devices = await Device.findAndCountAll({ limit, offset })
      }
      if (brandId && !typeId) {
         devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
      }
      if (!brandId && typeId) {
         devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
      }
      if (brandId && typeId) {
         devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
      }
      return res.json(devices)
   }

   async getOne(req, res) {
      const { id } = req.params
      const device = await Device.findOne(
         {
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
         }
      )
      return res.json(device)
   }

   async deleteOne(req, res, next) {
      try {
         const { id } = req.params
         const device = await Device.findOne(
            {
               where: { id },
               include: [{ model: DeviceInfo, as: 'info' }]
            }
         )
         if (device) {
            await unlink(`./static/${device.img}`)
            await device.destroy()
            return res.json("Успешно")
         } else {
            return res.json('Такой записи нет')
         }
      } catch (error) {
         next(ApiError.badRequest(error.message))
      }
   }
}

module.exports = new DeviceController()