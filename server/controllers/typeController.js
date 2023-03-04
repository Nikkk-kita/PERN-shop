const { Type, Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiEror')
const { unlink } = require('fs/promises')

class TypeController {
   async create(req, res) {
      const { name } = req.body
      const type = await Type.create({ name })
      return res.json(type)
   }

   async getAll(req, res) {
      const types = await Type.findAll()
      return res.json(types)
   }

   async delete(req, res, next) {
      try {
         const { name } = req.params
         const type = await Type.findOne({ where: { name } })
         if (type) {
            const devices = await Device.findAll(
               {
                  where: { typeId: type.id },
                  include: [{ model: DeviceInfo, as: 'info' }]
               }
            )
            for (let device of devices) {
               await unlink(`./static/${device.img}`)
               await device.destroy()
            }
            await type.destroy()
            res.json("Успешно")
         } else {
            res.json('Такого типа устройств нет')
         }
         return res.json(brand)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
}

module.exports = new TypeController()