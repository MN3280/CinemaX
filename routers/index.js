const express = require('express')
const router = express.Router()
const dataErrors = require('../middlewares/errorHandler')
const customer = require('./customer')
const ticket = require('./ticket')
const movie = require('./movie')


router.use("/customer", customer)
router.use("/tickets", ticket)
router.use('/movies', movie)
router.use(dataErrors)
module.exports = router 