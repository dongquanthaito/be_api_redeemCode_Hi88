const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    findMemo: (req, res) => {
        let getToken = tokenBOModel.findOne({Account: information.usernameBO}).exec()
        if(getToken) {
            let {...body} = req.body
            try {
                let data = {
                    "pageInfo": {
                        "count": 1000,
                        "index": 0
                    },
                    "search": {
                    "Account": body.Account,
                    "agSearchType": 0,
                    "TimeBegin": body.TimeBegin,
                    "Types": [
                        "Bonus"
                    ]
                    }
                }
               
                let option = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/api/1.0/transactions/query',
                    headers: { 
                        'authorization': 'Bearer '+ getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information.linkBO, 
                        'referer': ' '+information.linkBO+'/',
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                };
                
                axios(option)
                .then(function (response) {
                    let boxMemo = []
                    response.data.Result.Records.forEach((el) => {
                        if(el.Memo == body.Memo) {
                            boxMemo.push(el.Memo)
                        }
                    })
                    if(boxMemo.includes(body.Memo)) {
                        res.json({
                            code: 200,
                            valid: false,
                            mess: "Đã nhận khuyến mãi."
                        })
                    } else {
                        res.json({
                            code: 404,
                            valid: true,
                            mess: "Chưa nhận khuyến mãi."
                        })
                    }
                })
                .catch(function (error) {
                    res.json({
                        code: 502,
                        mess: "Bad Gateway",
                        err: error
                    })
                });
            } catch (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        } else {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }        
    },

    findMemoClient: async(playerID, timeBegin, memo) => {
        let getToken = await tokenBOModel.findOne({Account: information.usernameBO}).exec()
        if(getToken) {
            try {
                let data = {
                    "pageInfo": {
                        "count": 1000,
                        "index": 0
                    },
                    "search": {
                        "Account": playerID,
                        "agSearchType": 0,
                        "TimeBegin": timeBegin,
                        "Types": [
                            "Bonus"
                        ]
                    }
                }
                
                let option = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/api/1.0/transactions/query',
                    headers: { 
                        'authorization': 'Bearer '+ getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information.linkBO, 
                        'referer': ' '+information.linkBO+'/',
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                };
                
                return axios(option)
                .then(function (response) {
                    let boxMemo = []
                    response.data.Result.Records.forEach((el) => {
                        if(el.Memo == memo) {
                            boxMemo.push(el.Memo)
                        }
                    })
                    if(boxMemo.includes(memo)) {
                        return false
                    } else {
                        return true
                    }
                })
                .catch(function (error) {
                    return 502
                });
            } catch (error) {
                return 502
            }
        } else {
            return 502
        }
    }
}