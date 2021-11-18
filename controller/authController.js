const { User } = require('../models')
const { comparePass } = require('../helper/bcrypt');
const {signToken} = require('../helper/jwt')
const { OAuth2Client } = require("google-auth-library")

class authController {
    static async register(req, res, next) {
        try {
            const { email, password , username} = req.body
            const createdUser = await User.create({ email, password, username })
            if (createdUser) {
                res.status(201).json({ id: createdUser.id, email: createdUser.email , username: createdUser.username})
            }
        } catch (err) {
          next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: 'InvalidEmail' }
            }
            if (!password) {
                throw { name: 'InvalidPassword' }
            }
            const founUser = await User.findOne({ where: { email } })
            if (founUser) {
                const compared = comparePass(password, founUser.password)
                if (compared) {
                    const access_token = signToken({ id: founUser.id, email: founUser.email })
                    res.status(200).json({ access_token: access_token })
                } else {
                    throw { name: 'cannotLogin' }
                }
            } else {
                throw { name: 'cannotLogin' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const { id_token } = req.body
            console.log(req.body);
            const client_id = process.env.GOOGLE_OATHID
            const client = new OAuth2Client(client_id)
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: client_id
            });
            const payload = ticket.getPayload()
            const { email } = payload
            const randomPass = Math.floor((Math.random() + 1)*55555)
            const [user, isCreated] = await User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    username: email,
                    password: randomPass.toString(),
                }
            })
            let status = 200
            if (isCreated) {
                status = 201
            }
            let tokenPayload = { id: user.id, email: user.email }
            let access_token = signToken(tokenPayload)
            res.status(status).json({ access_token })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = authController