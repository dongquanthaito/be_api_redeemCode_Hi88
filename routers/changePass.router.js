const express = require('express')
const { changePass } = require('../controllers/account.controller')
const Router = express.Router()

Router.route('/').patch(changePass)

module.exports = Router