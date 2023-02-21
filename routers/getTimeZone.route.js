const express = require('express')
const { getTimeZone } = require('../controllers/getTimeZone.controller')
const Router = express.Router()



Router.route('/').get(getTimeZone)

module.exports = Router