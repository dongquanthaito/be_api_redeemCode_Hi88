const mongoose = require('mongoose')

const tokenBo = mongoose.Schema({
    exp: String,
    npf: String,
    Id: String,
    Account: String,
    IsSub: Boolean,
    IsVisible: Boolean,
    Isvalidated: Boolean,
    Token: String
})

module.exports = mongoose.model('tokenBo', tokenBo)