const express = require('express')
const { addIPFP, findIPFP } = require('../controllers/ipfp.controller')
const Router = express.Router()

Router.route('/').post(addIPFP).get(findIPFP)

module.exports = Router