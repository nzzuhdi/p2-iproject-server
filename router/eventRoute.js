const eventRoute = require('express').Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const eventController = require('../controller/eventController')
const {authorization,adminAuthorization} = require('../middleware/authorization')

const toImagekit = require('../middleware/upload')


eventRoute.get('/', eventController.getEvents)
eventRoute.post('/', upload.single('imageUrl'), toImagekit, eventController.postEvent)
eventRoute.get('/players', upload.single('imageUrl'), toImagekit, eventController.postEvent)
eventRoute.post('/players', upload.single('imageUrl'), toImagekit, eventController.postEvent)

eventRoute.get('/:id', eventController.getEventDetail)
// eventRoute.put('/:id', authorization, upload.single('imgUrl'), toImagekit, eventController.updateEvent)
// eventRoute.delete('/:id', authorization, eventController.deleteEvent)



module.exports = newsRoute