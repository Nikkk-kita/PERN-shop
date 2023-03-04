const { Brand, Device, DeviceInfo } = require("../models/models")
const ApiError = require('../error/ApiEror')
const { unlink } = require('fs/promises')

class BrandController {
   async create(req, res) {
      const { name } = req.body
      const brand = await Brand.create({ name })
      return res.json(brand)
   }

   async getAll(req, res) {
      const brands = await Brand.findAll()
      return res.json(brands)
   }

   async delete(req, res, next) {
      try {
         const { name } = req.params
         const brand = await Brand.findOne({ where: { name } })
         if (brand) {
            const devices = await Device.findAll(
               {
                  where: { brandId: brand.id },
                  include: [{ model: DeviceInfo, as: 'info' }]
               }
            )
            for (let device of devices) {
               await unlink(`./static/${device.img}`)
               await device.destroy()
            }
            await brand.destroy()
            res.json("Успешно")

         } else {
            res.json('Такого бренда нет')
         }
         return res.json(brand)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
}

module.exports = new BrandController()