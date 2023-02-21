const accountmodel = require('../models/account.model')
const jwt = require('jsonwebtoken')

module.exports = async(req,res,next)=>{
    try {
        let decode = jwt.verify(req.headers.authorization,"abcxyz")
        if(decode){
            let account = await accountmodel.findById(decode._id)
            if(account==null){
                res.json({
                    statusCode: 498,
                    valid:false,
                    mess:"Token invalid"
                })
            }else{
                req.account = account
                next()
            }
        }else{
            res.json({
                statusCode: 403,
                valid:false,
                mess:"Forbidden"
            })
        }
    } catch (error) {
        res.json({
            statusCode: 403,
            err: 'Token Error',
            detail: error
        })
    }
}