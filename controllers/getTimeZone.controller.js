const axios = require('axios');

module.exports = {
  getTimeZone: async (req, res) => {
      try {
          let config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: 'https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Ho_Chi_Minh',
              headers: { 
                'Accept': 'application/json'
              }
            };
            
            axios(config)
            .then(function (response) {
              res.json(response.data)
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
  }, 
  getTimeZoneClient: () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Ho_Chi_Minh',
            headers: { 
              'Accept': 'application/json'
            }
          };
          
          return axios(config)
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            return false
          });
    } catch (error) {
        return false
    }
}
}