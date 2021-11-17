const { User, Player, Event } = require('../models')

class eventController {
    static async getEvents(req, res, next) {
        try {
     
            const result = await Event.findAll({ include: [Player, User], order: [["updatedAt", "DESC"]] })
            res.status(200).json({ result })
        } catch (err) {
            next(err)
        }
    }
    static async postEvent(req, res, next) {
        try {
          
        } catch (err) {
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