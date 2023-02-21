const ipfpModel = require('../models/ipfp.model')

module.exports = {
    addIPFP: async(req, res) => {
        let {...body} = req.body
        try {
            let add = await ipfpModel.create(body)
            res.json({
                statusCode: 200,
                valid: true,
                detail: add
            })
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    findIPFP: async(req, res) => {
        let {...query} = req.query
        try {
            let fp = query.fp
            let box = []
            let find = await ipfpModel.find(query)
            find.forEach((el) => {
                if(fp == el.fp)
                box.push('1')
            })

            if(box.length > 0) {
                return false 
            } else if(box.length == 0) {
                return true
            }
        } catch (error) {
            return 502
        }
    }
}