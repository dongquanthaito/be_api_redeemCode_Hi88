module.exports = {
    checkAuth: async(req, res) => {
        try {
            res.json('pong')
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    }
}