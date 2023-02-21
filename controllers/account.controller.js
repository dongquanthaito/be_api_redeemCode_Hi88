const accountModel = require('../models/account.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    createAcc: async(req, res) => {
        let {...body} = req.body
        try {
            let createAcc = await accountModel.create(body)
            res.json({
                statusCode: 200,
                valid: true,
                detail: createAcc
            })
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    login: async(req, res) => {
        let {...body} = req.body
        let account = await accountModel.findOne({username: body.username}).exec()
        if(!account) {
            res.json({
                code:404,
                mess:"Không tìm thấy tài khoản",
            })
        } else {
            let check = bcryptjs.compareSync(body.password, account.password)
            if(check) {
                let token = jwt.sign({
                    _id: account._id,
                    username: account.username,
                    role: account.role
                }, 'abcxyz', {expiresIn: '5h'})

                res.json({
                    _id:account._id,
                    username: account.username,
                    role: account.role,
                    token: token
                })
            } else {
                res.json({
                    code: 403,
                    mess: "Mật khẩu không chính xác",
                })
            }
        }
    },

    getAcc: async(req, res) => {
        let {...query} = req.query
        try {
            let read = await accountModel.find(query)
            res.json({
                statusCode: 200,
                valid: true,
                detail: read
            })
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    updateAcc: async(req, res) => {
        let {...body} = req.body
        try {
            let update = await accountModel.findOneAndUpdate({username: body.username}, body)
            if(update) {
                res.json({
                    statusCode: 200,
                    valid: true,
                    detail: update
                })
            } else {
                res.json({
                    status_code: 404,
                    mess: "Không tìm thấy tài khoản"
                })
            }
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    deleteAcc: async(req, res) => {
        let {...query} = req.query
        try {
            let del = await accountModel.deleteMany(query)
            res.json(del)
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    changePass: async(req, res) => {
        let {...body} = req.body
        if(body.role) {
            res.json({
                code: 403,
                status: "Forbidden",
            })
        } else {

            try {
                let update = await accountModel.findOneAndUpdate({username: body.username}, {password: body.password})
                if(update) {
                    res.json({
                        statusCode: 200,
                        valid: true,
                        detail: update
                    })
                } else {
                    res.json({
                        status_code: 404,
                        mess: "Không tìm thấy tài khoản"
                    })
                }
            } catch (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        }
        
    }
}