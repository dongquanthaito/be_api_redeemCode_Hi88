const express = require('express')
const { getClientIPFP } = require('../controllers/getClientIPFP.controller')
const Router = express.Router()

Router.route('/').get(getClientIPFP)

module.exports = Router
