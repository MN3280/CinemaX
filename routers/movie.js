const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')


router.get('/', movieController.readMovie)
router.get('/:id', movieController.getOneMovie)

module.exports = router