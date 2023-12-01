const express = require('express')
const router = express.Router()
const custController = require('../controllers/custController')


router.get('/', custController.readCust)
router.post('/register', custController.register)
router.post('/login', custController.login)

module.exports = router