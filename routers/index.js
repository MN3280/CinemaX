const express = require('express')
const router = express.Router()
const dataErrors = require('../middlewares/errorHandler')
const { authentication } = require('../middlewares/authentication')
const customer = require('./customer')
const movie = require('./movie')
const ticket = require('./ticket')


router.use("/customer", customer)
router.use(authentication)
router.use('/movies', movie)
router.use("/tickets", ticket)
router.use(dataErrors)
module.exports = router 