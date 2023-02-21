const express = require('express')
const { getDepositToken } = require('../controllers/depositToken.controller')
const Router = express.Router()

Router.route('/').get(getDepositToken)

module.exports = Router