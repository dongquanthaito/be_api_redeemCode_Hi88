const express = require('express')
const { getTokenBO } = require('../controllers/loginBO.controller')
const Router = express.Router()

Router.route('/').get(getTokenBO)

module.exports = Router