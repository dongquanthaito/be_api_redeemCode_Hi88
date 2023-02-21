const mongoose = require('mongoose')

const ipfp = mongoose.Schema({
    ip: String,
    fp: String
})

module.exports = mongoose.model('ipfp', ipfp)