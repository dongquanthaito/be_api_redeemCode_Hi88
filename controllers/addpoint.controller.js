const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    f8bet: async (req, res)=>{

        let getToken = tokenBOModel.findOne({Account: information.usernameBO}).exec()
        if(getToken) {
            let {...body} = req.body
            try {
                let data = {
                    "AccountsString": body.AccountsString,
                    "Amount": body.Amount,
                    "AmountString": body.Amount,
                    "Audit": body.Audit,
                    "AuditType": "Discount",
                    "DepositToken": body.DepositToken,
                    "IsReal": false,
                    "Memo": body.Memo,
                    "Password": information.passBO,
                    "PortalMemo": body.PortalMemo,
                    "TimeStamp": body.TimeStamp,
                    "Type": 5
                }
                    let config = {
                    method: 'post',
                    url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                    headers: { 
                        'authorization': 'Bearer ' + getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information.linkBO, 
                        'referer': ' '+information.linkBO+'/',
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                    };
                    
                    axios(config)
                    .then(function (response) {
                        res.json(response.data)
                    })
                    .catch(function (error) {
                        res.json(error);
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
                mess: "Bad Gateway"
            })
        }
        
    }, 
    f8betClient: async (player_id, point, deposit, memo, round)=>{
        let getToken = await tokenBOModel.findOne({Account: information.usernameBO}).exec()
        if(getToken) {
            try {
                let data = {
                    "AccountsString": player_id,
                    "Amount": point,
                    "AmountString": point,
                    "Audit": point * round,
                    "AuditType": "Discount",
                    "DepositToken": deposit,
                    "IsReal": false,
                    "Memo": memo,
                    "Password": information.passBO,
                    "PortalMemo": memo,
                    "TimeStamp": new Date().getTime,
                    "Type": 5
                }
                    let config = {
                    method: 'post',
                    url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                    headers: { 
                        'authorization': 'Bearer ' + getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information.linkBO, 
                        'referer': ' '+information.linkBO+'/',
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                    };
                    
                    return axios(config)
                    .then(function (response) {
                        return response.data
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