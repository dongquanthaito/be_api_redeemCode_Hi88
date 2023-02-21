const express = require('express')
const { randomCode } = require('../controllers/randomCode.controller')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')
const roleType =require('../const/role')

const Router = express.Router()

Router.route('/').post(auth, role([roleType.SUPERADMIN, roleType.ADMIN]), randomCode)

module.exports = Router
