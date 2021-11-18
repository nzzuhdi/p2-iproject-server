const jwt = require('jsonwebtoken')

function signToken(payload){
return jwt.sign(payload, 'secred')
}
function verifyToken(token){
    return jwt.verify(token, 'secred')
}


module.exports = {
    signToken,
    verifyToken
}