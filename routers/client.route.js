const express = require('express')
const Router = express.Router()
const { getCodeClient, addPointClient } = require('../controllers/client.controller.js')

Router.route('/get-code').post(getCodeClient)
Router.route('/').post(addPointClient)

module.exports = Router