const { User, Player, Event } = require('../models')
const postEmailCreator = require('../helper/nodemailer')
class eventController {
    static async getEvents(req, res, next) {
        try {
            const result = await Event.findAll({ 
                attributes:{
                    exclude: ["createdAt", "updatedAt", "password"]
                }, 
                order: [["updatedAt", "DESC"]] })
            res.status(200).json(result)
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
            next(err)
        }
    }
    static async getEventDetail(req, res, next) {
        try {
            const result = await Event.findOne({
                include:[{
                    model:Player,
                    include:[{
                        model: User , attributes:{
                            exclude: ["createdAt", "updatedAt", "password", "id", "email"]
                        } }],
                    attributes:{
                        exclude: ["createdAt", "updatedAt", "UserId","EventId"]
                    } 
                }
            ],
            attributes:{
                exclude: ["createdAt", "updatedAt"]
            },
                where:{
                    id: req.params.id
                },
                order: [["updatedAt", "DESC"]]
            })
            console.log(result.Players[1].User.username);
            res.status(200).json(result)

        } catch (err) {
            next(err)
        }
    }

    static async getPlayers(req, res, next) {
        try {
            console.log('masuk getpl');
            const result = await Player.findAll({ 
                attributes:{
                    exclude: ["createdAt", "updatedAt", "password"]
                }, 
                order: [["updatedAt", "DESC"]] })
            res.status(200).json(result)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async postPlayers(req, res, next) {
        try {
            const UserId = req.user.id
            const email = req.user.email
            const {  eventId } = req.params
            const input = {
                where: {
                    UserId,
                    EventId: eventId
                },
                defaults: {
                    UserId,
                    EventId: eventId
                }
            }
            console.log(input);
            const [user, isCreated] = await Player.findOrCreate(input)
            if (!isCreated) {
            throw{name:'doubleJoin'}
            }else{
                const eventDetail = await Event.findOne({where: {id: eventId}})
                if(eventDetail){
                    let inputPlayer =  {
                        email: `${email}`,
                        eventname: `${eventDetail.name}`,
                        date: `${eventDetail.date}`,
                        time:`${eventDetail.time}`,
                        category: `${eventDetail.category}`
                      }
                       await postEmailCreator(inputPlayer)
                      res.status(201).json({ user, message: `Success Join ${eventDetail.name} & Check your email for the reminder` })
                }
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }




}

module.exports = eventController