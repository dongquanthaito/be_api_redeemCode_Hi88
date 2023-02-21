const axios = require('axios');
const information = require('../const/information');

module.exports = {
    randomCode: (req, res) => {
        let {...query} = req.query

        function getRandom(code_length) {
            let codeLength = code_length
        
            let code_string = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < codeLength) {
                code_string += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return code_string
        }
        
        let codeBox = []
        let code_length = query.code_length
        let list_code_length = query.list_code_length
        let date_code = query.date_code
        let site = query.site
        let point = query.point
        let ip = query.ip
        let fp = query.fp
        let exp_code = query.exp_code
        let round = query.round
        
        for(i = 0; i < list_code_length; i++) {
            codeBox.push({
              date_code: date_code, 
              site: site, 
              promo_code: getRandom(code_length), 
              point: point, 
              user_used: 'non',
              ip: ip,
              fp: fp,
              exp_code: exp_code,
              used_time: 0,
              round: round
            })
        }

        let data = JSON.stringify(codeBox);
          
          let config = {
            method: 'post',
            url: information.endpoint+'code',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            if(response.data.insertedCount > 0) {
              res.json({
                valid: true,
                codCount: codeBox.length,
                mess: "Thêm code thành công",
                detail: codeBox
              })
            } else {
              res.json({
                valid: false,
                codCount: codeBox.length,
                mess: "Rỗng"
              })
            }
            
          })
          .catch(function (error) {
            res.json(error)
            console.log(error);
          }); 
        
    }
}