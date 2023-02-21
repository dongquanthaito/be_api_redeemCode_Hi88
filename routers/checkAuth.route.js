const express = require('express')
const role = require('../middlewares/role.middleware')
const roleType =require('../const/role')
const Router = express.Router()
const auth = require('../middlewares/auth.middleware')

const { checkAuth } = require('../controllers/checkAuth.controller')

Router.route('/').get(auth, checkAuth)

module.exports = Router