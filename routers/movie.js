const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')


router.get('/', movieController.getMovie)
router.get('/:id', movieController.detailMovie)

module.exports = router