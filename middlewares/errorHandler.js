const dataError = (err, req, res, next) => {
    if (err.name === 'LoginError') {
        res.status(401).json({
            msg: 'Error login user not found atau password not matched'
        })
    }
}

module.exports = dataError