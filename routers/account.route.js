const express = require('express')
const role = require('../middlewares/role.middleware')
const roleType =require('../const/role')
const Router = express.Router()
const auth = require('../middlewares/auth.middleware')
const { getAcc, updateAcc, deleteAcc, createAcc, login } = require('../controllers/account.controller')

Router.route('/').get(auth, role([roleType.SUPERADMIN, roleType.ADMIN]), getAcc)
Router.route('/').patch(auth, role([roleType.SUPERADMIN, roleType.ADMIN]), updateAcc)
Router.route('/').delete(auth, role([roleType.SUPERADMIN, roleType.ADMIN]), deleteAcc)

Router.route('/register').post(auth, role([roleType.SUPERADMIN, roleType.ADMIN]), createAcc)

Router.route('/login').post(login)

module.exports = Router