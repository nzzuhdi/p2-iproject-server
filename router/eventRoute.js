const eventRoute = require('express').Router()
const multer = require('multer')
const app = require('../app')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const eventController = require('../controller/eventController')
const {authentication} = require('../middleware/authentication')


const toImagekit = require('../middleware/upload')


eventRoute.get('/', eventController.getEvents)

app.use(authentication)
eventRoute.post('/', upload.single('imageUrl'), toImagekit, eventController.postEvent)
eventRoute.get('/players', upload.single('imageUrl'), toImagekit, eventController.postEvent)
eventRoute.post('/players', upload.single('imageUrl'), toImagekit, eventController.postEvent)

eventRoute.get('/:id', eventController.getEventDetail)
// eventRoute.put('/:id', authorization, upload.single('imgUrl'), toImagekit, eventController.updateEvent)
// eventRoute.delete('/:id', authorization, eventController.deleteEvent)



module.exports = newsRoute