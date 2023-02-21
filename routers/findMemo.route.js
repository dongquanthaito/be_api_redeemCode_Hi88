const express = require('express')
const { findMemo } = require('../controllers/findMemo.controller')
const Router = express.Router()

Router.route('/').post(findMemo)

module.exports = Router