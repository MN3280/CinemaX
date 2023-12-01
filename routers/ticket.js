const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')


router.get('/', ticketController.readTicker)
router.post('/', ticketController.createTicket)
router.get('/:id', ticketController.getOneMovie)


module.exports = router