const express = require('express')
const router = express.Router()
const custController = require('../controllers/custController')
const { authentication } = require('../middlewares/authentication')



router.get('/', custController.readCust)
router.get('/ticket',authentication, custController.readTicket)
router.post('/register', custController.registerCust)
router.post('/login', custController.loginCust)
router.use(authentication)
router.post('/ticketPurchase', custController.ticketPurchase)
router.put('/editTicket/:id', custController.editTicket)
router.delete('/deleteTicket/:id', custController.deleteTicket)


module.exports = router