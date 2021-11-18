const { User, Player, Event } = require('../models')

class eventController {
    static async getEvents(req, res, next) {
        try {
            const result = await Event.findAll({ order: [["updatedAt", "DESC"]] })
            res.status(200).json( result )
        } catch (err) {
            next(err)
        }
    }
    static async postEvent(req, res, next) {
        try {
            const { name, category, address, imageUrl, lattitude, longitude, date, time } = req.body
            const input = {
              name,
              category,
              address,
              imageUrl,
              lattitude: Number(lattitude),
              longitude: Number(longitude),
              date,
              time
            }
            console.log(input);
            const result = await Event.create(input)
            if (result) {
                res.status(201).json({ result })
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async getEventDetail(req, res, next) {
        try {
          
        } catch (err) {
            next(err)
        }
    }

    static async getPlayers(req, res, next) {
        try {
           
        } catch (err) {
            next(err)
        }
    }

    static async postPlayers(req, res, next) {
        try {
            
        } catch (err) {
            next(err)
        }
    }

   


}

module.exports = eventController