const router = require('express').Router()
const authRoute = require('./authRoute')
const eventRoute = require('./eventRoute')
const {authentication} = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandler');


router.use('/', authRoute)

router.use(authentication)

router.use('/events', eventRoute)

router.use(errorHandler)




module.exports = router