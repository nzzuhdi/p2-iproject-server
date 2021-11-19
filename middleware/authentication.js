const {verifyToken} = require('../helper/jwt')
const { User } = require('../models')


const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (access_token) {
            const verifiedUser = verifyToken(access_token)
            if (verifiedUser) {
                const findUser = await User.findOne({
                    where:
                        { email: verifiedUser.email }
                })
                if (findUser) {
                    req.user = {
                        id: findUser.id,
                        email: findUser.email
                    }
                    next()
                }else{
                throw { name: "Unauthorized" }
                }
            } else {
                throw { name: "Unauthorized" }
            }
        } else {
            throw { name: "Unauthorized" }
        }
    } catch (err) {
       next(err)
    }
}

module.exports ={ authentication }