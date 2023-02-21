const mongoose = require('mongoose')

const codeUsed = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    promo_code: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('codeUsed', codeUsed)