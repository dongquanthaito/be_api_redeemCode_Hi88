const express = require('express')
const { f8bet } = require('../controllers/addpoint.controller')
const Router = express.Router()

Router.route('/f8bet').post(f8bet)

module.exports = Router
