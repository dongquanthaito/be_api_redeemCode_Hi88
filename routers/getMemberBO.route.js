const express = require('express')
const { getMemberBO } = require('../controllers/getMemberBO.controller')
const Router = express.Router()

Router.route('/').get(getMemberBO)

module.exports = Router