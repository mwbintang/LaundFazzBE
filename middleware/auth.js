const { verifyJWT } = require('../helper/jwt')
const {User} = require('../models')

const isAuth = async (req, res, next)=>{
    try {
        const {access_token} = req.headers
        if(!access_token) {
            throw ({name:'Not login'})
        }
        const jwtVerified = verifyJWT(access_token)
        if(!jwtVerified){
            throw ({name:'User Not Found'})
        }
        const userLogin = await User.findByPk(jwtVerified.id)
        if(!userLogin){
            throw ({name:'User Not Found'})
        }

        req.userFind = {
            id:userLogin.id,
            role:userLogin.role
        }
        next()

    } catch (error) {
        next(error)
    }
}

const isAdmin = async (req, res, next)=>{
    try {
        const roleAuth = req.userFind.role
        if(roleAuth === 'Admin'){
            next()
        }else{
            throw ({name:'You are not admin'})
        }
    } catch (error) {
        next(error)
    }  
}

module.exports = {
    isAuth,
    isAdmin
}