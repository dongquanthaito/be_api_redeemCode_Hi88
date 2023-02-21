const express = require('express')
const { hi88 } = require('../controllers/addpoint.controller')
const Router = express.Router()

Router.route('/hi88').post(hi88)

module.exports = Router
